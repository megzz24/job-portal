from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Application, Job, Skill
from users.models import JobSeeker
from .serializers import ApplicationSerializer, JobSerializer, SkillSerializer
from django.db.models import Count
from rest_framework import status, generics, permissions
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Case, When, Value, IntegerField, Q

@api_view(["GET"])
def dashboard_summary(request):
    user = request.user

    if not hasattr(user, "jobseeker_profile"):
        return Response({"error": "This user is not a jobseeker"}, status=400)

    jobseeker = user.jobseeker_profile
    applications = Application.objects.filter(jobseeker=jobseeker)

    summary = {
        "jobseeker_name": user.first_name,
        "total_applications": applications.count(),
        "under_review": applications.filter(status="review").count(),
        "interviews": applications.filter(status="interview").count(),
        "offers": applications.filter(status="accepted").count(),
        "reject": applications.filter(status="rejected").count(),
    }
    return Response(summary)


@api_view(["GET"])
def applications_list(request):
    jobseeker = request.user.jobseeker_profile
    applications = Application.objects.filter(jobseeker=jobseeker).order_by(
        "-applied_at"
    )
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data)


class SkillCreateView(APIView):
    def post(self, request):
        name = request.data.get("name")
        if not name:
            return Response(
                {"error": "Name required"}, status=status.HTTP_400_BAD_REQUEST
            )
        skill, created = Skill.objects.get_or_create(name=name.strip())
        serializer = SkillSerializer(skill)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# List all jobs
class JobListView(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]


# Get job details
class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]


# Apply to a job
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def apply_job(request, job_id):
    user = request.user
    if not hasattr(user, "jobseeker_profile"):
        return Response({"error": "Only jobseekers can apply"}, status=400)

    jobseeker = user.jobseeker_profile
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response({"error": "Job not found"}, status=404)

    if Application.objects.filter(job=job, jobseeker=jobseeker).exists():
        return Response({"error": "Already applied"}, status=400)

    cover_letter = request.data.get("cover_letter", "")
    resume_file = request.FILES.get("resume")
    application = Application.objects.create(
        job=job, jobseeker=jobseeker, cover_letter=cover_letter, resume=resume_file
    )

    serializer = ApplicationSerializer(application)
    return Response(serializer.data, status=201)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_job(request, job_id):
    """
    Save a job for the authenticated job seeker.
    """
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

    try:
        job_seeker = request.user.jobseeker_profile
    except JobSeeker.DoesNotExist:
        return Response({"detail": "Job seeker profile not found"}, status=status.HTTP_400_BAD_REQUEST)

    job_seeker.saved_jobs.add(job)
    return Response({"detail": "Job saved successfully"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def unsave_job(request, job_id):
    """
    Remove a job from saved jobs.
    """
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

    try:
        job_seeker = request.user.jobseeker_profile
    except JobSeeker.DoesNotExist:
        return Response({"detail": "Job seeker profile not found"}, status=status.HTTP_400_BAD_REQUEST)

    job_seeker.saved_jobs.remove(job)
    return Response({"detail": "Job unsaved successfully"}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def saved_jobs_list(request):
    """
    Returns a list of jobs saved by the authenticated job seeker.
    """
    try:
        job_seeker = request.user.jobseeker_profile
    except JobSeeker.DoesNotExist:
        return Response({"detail": "Job seeker profile not found"}, status=400)

    saved_jobs = job_seeker.saved_jobs.all()
    serializer = JobSerializer(saved_jobs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recommended_jobs(request):
    user = request.user

    # Ensure the user is a job seeker
    try:
        seeker = JobSeeker.objects.get(user=user)
    except JobSeeker.DoesNotExist:
        return Response(
            {"detail": "Only job seekers can access recommended jobs"}, 
            status=403
        )

    seeker_skills = seeker.skills.all()  # ManyToManyField
    seeker_location = seeker.location

    # Jobs already applied to
    applied_jobs = Application.objects.filter(jobseeker=seeker).values_list('job_id', flat=True)

    # Filter jobs that are OPEN, match skill OR location, and exclude applied jobs
    jobs = Job.objects.filter(
        is_open=True
    ).filter(
        Q(skills__in=seeker_skills) | Q(location=seeker_location)
    ).exclude(
        id__in=applied_jobs
    ).distinct()

    # Annotate if the location matches
    jobs = jobs.annotate(
        location_match=Case(
            When(location=seeker_location, then=Value(1)),
            default=Value(0),
            output_field=IntegerField()
        )
    ).order_by('-location_match', '-posted_at')  # prioritize same location, then latest

    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)
