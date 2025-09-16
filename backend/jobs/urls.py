from django.urls import path
from .views import (
    JobCreateView,
    JobListView,
    JobDetailView,
    JobUpdateView,
    JobDeleteView,
    ApplicationCreateView,
    ApplicationListView,
    ApplicationDetailView,
    ApplicationStatusUpdateView,
    SkillListView,
    SkillCreateView,
)

urlpatterns = [
    # Job Endpoints
    path('jobs/', JobListView.as_view(), name='job-list'),
    path('jobs/create/', JobCreateView.as_view(), name='job-create'),
    path('jobs/<int:pk>/', JobDetailView.as_view(), name='job-detail'),
    path('jobs/<int:pk>/update/', JobUpdateView.as_view(), name='job-update'),
    path('jobs/<int:pk>/delete/', JobDeleteView.as_view(), name='job-delete'),

    # Application Endpoints
    path('jobs/<int:job_id>/apply/', ApplicationCreateView.as_view(), name='job-apply'),
    path('applications/', ApplicationListView.as_view(), name='application-list'),
    path('applications/<int:pk>/', ApplicationDetailView.as_view(), name='application-detail'),
    path('applications/<int:pk>/update/', ApplicationStatusUpdateView.as_view(), name='application-update'),

    # Skill Endpoints
    path('skills/', SkillListView.as_view(), name='skill-list'),
    path('skills/create/', SkillCreateView.as_view(), name='skill-create'),
]
