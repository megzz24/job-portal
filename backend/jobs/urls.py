from django.urls import path
from . import views

urlpatterns = [
    path("summary/", views.dashboard_summary, name="dashboard-summary"),
    path("applications/", views.applications_list, name="applications-list"),
    path("skills/", views.SkillCreateView.as_view(), name="skill-create"),
]
