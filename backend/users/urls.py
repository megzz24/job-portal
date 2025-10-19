# users/urls.py
from django.urls import path
from .views import (
    CompanyRepProfileView,
    JobSeekerRegisterView,
    CompanyRepRegisterView,
    CustomTokenObtainPairView,
    JobSeekerProfileView,
    JobSeekerAvatarUpdateView,
    JobSeekerResumeUploadView,
    CompanyInfoView,
    CompanyUpdateView,
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path(
        "jobseeker/register/",
        JobSeekerRegisterView.as_view(),
        name="jobseeker-register",
    ),
    path(
        "companyrep/register/",
        CompanyRepRegisterView.as_view(),
        name="companyrep-register",
    ),
    path("login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("profile/", JobSeekerProfileView.as_view(), name="jobseeker-profile"),
    path("profile/avatar/", JobSeekerAvatarUpdateView.as_view(), name="update-avatar"),
    path(
        "profile/resume/", JobSeekerResumeUploadView.as_view(), name="jobseeker-resume"
    ),
    path("company/info/", CompanyInfoView.as_view(), name="company-info"),
    path("company/update/", CompanyUpdateView.as_view(), name="company-update"),
    path(
        "companyrep/profile/",
        CompanyRepProfileView.as_view(),
        name="companyrep-profile",
    ),
    path(
        "companyrep/update/", CompanyRepProfileView.as_view(), name="companyrep-update"
    ),
]
