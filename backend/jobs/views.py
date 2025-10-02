from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Application, Job, Skill
from .serializers import ApplicationSerializer, JobSerializer, SkillSerializer
from django.db.models import Count
from rest_framework import status, generics, permissions
from rest_framework.views import APIView


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


# Save / bookmark a job (optional)
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def save_job(request, job_id):
    # You can create a SavedJob model or just return success for now
    return Response({"success": True, "message": "Job saved"})
