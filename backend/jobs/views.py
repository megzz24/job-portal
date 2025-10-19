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
        return Response(
            {"detail": "Job seeker profile not found"},
            status=status.HTTP_400_BAD_REQUEST,
        )

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
        return Response(
            {"detail": "Job seeker profile not found"},
            status=status.HTTP_400_BAD_REQUEST,
        )

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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recommended_jobs(request):
    user = request.user

    # Ensure the user is a job seeker
    try:
        seeker = JobSeeker.objects.get(user=user)
    except JobSeeker.DoesNotExist:
        return Response(
            {"detail": "Only job seekers can access recommended jobs"}, status=403
        )

    seeker_skills = seeker.skills.all()  # ManyToManyField
    seeker_location = seeker.location

    # Jobs already applied to
    applied_jobs = Application.objects.filter(jobseeker=seeker).values_list(
        "job_id", flat=True
    )

    # Filter jobs that are OPEN, match skill OR location, and exclude applied jobs
    jobs = (
        Job.objects.filter(is_open=True)
        .filter(Q(skills__in=seeker_skills) | Q(location=seeker_location))
        .exclude(id__in=applied_jobs)
        .distinct()
    )

    # Annotate if the location matches
    jobs = jobs.annotate(
        location_match=Case(
            When(location=seeker_location, then=Value(1)),
            default=Value(0),
            output_field=IntegerField(),
        )
    ).order_by(
        "-location_match", "-posted_at"
    )  # prioritize same location, then latest

    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def company_jobs(request):
    user = request.user

    # Ensure the user is a company representative
    if not hasattr(user, "companyrep_profile"):
        return Response(
            {"detail": "Only company representatives can access this"}, status=403
        )

    company = user.companyrep_profile.company

    # Fetch all jobs posted by this company
    jobs = (
        Job.objects.filter(company=company)
        .annotate(applications_count=Count("applications"))
        .order_by("-posted_at")
    )
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def job_applicants(request, job_id):
    user = request.user

    # Ensure the user is a company representative
    if not hasattr(user, "companyrep_profile"):
        return Response(
            {"detail": "Only company representatives can access applicants"}, status=403
        )

    company = user.companyrep_profile.company

    # Fetch the job and ensure it belongs to this company
    try:
        job = Job.objects.get(id=job_id, company=company)
    except Job.DoesNotExist:
        return Response(
            {"detail": "Job not found or you do not have access"}, status=404
        )

    # Fetch all applicants for this job
    applications = Application.objects.filter(job=job).order_by("-applied_at")
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def close_job(request, job_id):
    user = request.user

    # Ensure the user is a company representative
    if not hasattr(user, "companyrep_profile"):
        return Response(
            {"detail": "Only company representatives can close jobs"}, status=403
        )

    company = user.companyrep_profile.company

    try:
        job = Job.objects.get(id=job_id, company=company)
    except Job.DoesNotExist:
        return Response(
            {"detail": "Job not found or you do not have access"}, status=404
        )

    job.is_open = False
    job.save()

    return Response({"detail": f"Job '{job.title}' closed successfully"})


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Job


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def reopen_job(request, job_id):
    user = request.user

    # Ensure the user is a company representative
    if not hasattr(user, "companyrep_profile"):
        return Response(
            {"detail": "Only company representatives can reopen jobs"}, status=403
        )

    company = user.companyrep_profile.company

    try:
        job = Job.objects.get(id=job_id, company=company)
    except Job.DoesNotExist:
        return Response(
            {"detail": "Job not found or you do not have access"}, status=404
        )

    job.is_open = True
    job.save()

    return Response({"detail": f"Job '{job.title}' reopened successfully"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_job(request):
    user = request.user

    # Ensure the user is a company representative
    if not hasattr(user, "companyrep_profile"):
        return Response(
            {"detail": "Only company representatives can create jobs"},
            status=status.HTTP_403_FORBIDDEN,
        )

    company_rep = user.companyrep_profile
    company = company_rep.company

    # Extract job data from request
    title = request.data.get("title")
    description = request.data.get("description")
    location = request.data.get("location")
    job_type = request.data.get("job_type")
    salary_range = request.data.get("salary_range", None)
    remote_status = request.data.get("remote_status", "No")
    skills = request.data.get("skills", [])  # Expect list of skill IDs

    if not title or not description or not job_type or not location:
        return Response(
            {"detail": "Title, description, job_type, and location are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Create job
    job = Job.objects.create(
        title=title,
        description=description,
        location=location,
        job_type=job_type,
        salary_range=salary_range,
        company=company,
        posted_by=company_rep,
        remote_status=remote_status,
    )

    if skills:
        skill_objs = []
        for skill_name in skills:
            skill_name = skill_name.strip()  # remove extra spaces
            if skill_name:  # skip empty strings
                skill_obj, created = Skill.objects.get_or_create(name=skill_name)
                skill_objs.append(skill_obj)
        # Attach all skill objects to the job
        job.skills.set(skill_objs)

    job.save()

    serializer = JobSerializer(job)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update_application_status(request, application_id):
    try:
        application = Application.objects.get(
            id=application_id, job__company=request.user.companyrep_profile.company
        )
    except Application.DoesNotExist:
        return Response({"detail": "Not found"}, status=404)

    new_status = request.data.get("status")
    if new_status not in ["applied", "review", "interview", "accepted", "rejected"]:
        return Response({"detail": "Invalid status"}, status=400)

    application.status = new_status
    application.save()

    return Response({"id": application.id, "status": application.status})


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_job(request, job_id):
    user = request.user

    if not hasattr(user, "companyrep_profile"):
        return Response(
            {"detail": "Only company representatives can delete jobs"},
            status=status.HTTP_403_FORBIDDEN,
        )

    company = user.companyrep_profile.company

    try:
        job = Job.objects.get(id=job_id, company=company)
    except Job.DoesNotExist:
        return Response(
            {"detail": "Job not found or you do not have access"}, status=404
        )

    job.delete()
    return Response({"detail": f"Job deleted successfully"}, status=200)


class JobUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, job_id):
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response(
                {"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except AttributeError:
            return Response(
                {"detail": "User has no company associated"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Remove 'skills' from serializer input
        data = request.data.copy()
        skills = data.pop("skills", [])

        serializer = JobSerializer(job, data=data, partial=True)
        if serializer.is_valid():
            job = serializer.save()

            # Ensure skills is a list
            if isinstance(skills, str):
                skills = [s.strip() for s in skills.split(",") if s.strip()]

            skill_objs = []
            for skill_name in skills:
                skill_obj, created = Skill.objects.get_or_create(name=skill_name)
                skill_objs.append(skill_obj)
            job.skills.set(skill_objs)

            return Response(JobSerializer(job).data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
