from django.urls import path
from . import views

urlpatterns = [
    path("summary/", views.dashboard_summary, name="dashboard-summary"),
    path("applications/", views.applications_list, name="applications-list"),
    path("skills/", views.SkillCreateView.as_view(), name="skill-create"),
    path("jobslist/", views.JobListView.as_view(), name="job-list"),
    path("<int:pk>/", views.JobDetailView.as_view(), name="job-detail"),
    path("<int:job_id>/apply/", views.apply_job, name="job-apply"),
    path("<int:job_id>/save/", views.save_job, name="save-job"),
    path("<int:job_id>/unsave/", views.unsave_job, name="unsave-job"),
    path("saved/", views.saved_jobs_list, name="saved-jobs"),
    path("recommended/", views.recommended_jobs, name="recommended-jobs"),
]
