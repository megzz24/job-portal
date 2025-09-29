from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Application, Job
from .serializers import ApplicationSerializer, JobSerializer
from django.db.models import Count

# Dashboard summary
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


# Applications list
@api_view(["GET"])
def applications_list(request):
    jobseeker = request.user.jobseeker_profile
    applications = Application.objects.filter(jobseeker=jobseeker).order_by("-applied_at")
    serializer = ApplicationSerializer(applications, many=True)
    return Response(serializer.data)

# # Recommended jobs (simple: based on matching skills)
# @api_view(["GET"])
# def recommended_jobs(request):
#     jobseeker = request.user.jobseeker
#     skills = jobseeker.skills.all()
#     jobs = Job.objects.filter(skills__in=skills).distinct()[:5]
#     serializer = JobSerializer(jobs, many=True)
#     return Response(serializer.data)
