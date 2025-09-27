# users/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import JobSeekerRegisterView, CompanyRepRegisterView

urlpatterns = [
    path('jobseeker/register/', JobSeekerRegisterView.as_view(), name='jobseeker-register'),
    path('companyrep/register/', CompanyRepRegisterView.as_view(), name='companyrep-register'),
        
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
