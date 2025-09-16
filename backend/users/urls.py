from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    JobSeekerRegisterView,
    JobSeekerProfileView,
    LogoutView,
    CompanyRepRegisterView,
    CompanyRepProfileView,
)

urlpatterns = [
    # JobSeeker Endpoints
    path('jobseeker/register/', JobSeekerRegisterView.as_view(), name='jobseeker-register'),
    path('jobseeker/profile/', JobSeekerProfileView.as_view(), name='jobseeker-profile'),
    path('jobseeker/logout/', LogoutView.as_view(), name='jobseeker-logout'),

    # Company Representative Endpoints
    path('companyrep/register/', CompanyRepRegisterView.as_view(), name='companyrep-register'),
    path('companyrep/profile/', CompanyRepProfileView.as_view(), name='companyrep-profile'),

    # JWT Token Endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
