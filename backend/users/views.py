from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import JobSeekerRegistrationSerializer, CompanyRepRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class JobSeekerRegisterView(generics.CreateAPIView):
    serializer_class = JobSeekerRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        jobseeker = serializer.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(jobseeker.user)

        return Response({
            "id": jobseeker.id,
            "email": jobseeker.user.email,
            "first_name": jobseeker.user.first_name,
            "last_name": jobseeker.user.last_name,
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=status.HTTP_201_CREATED)

class CompanyRepRegisterView(generics.CreateAPIView):
    serializer_class = CompanyRepRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        company_rep = serializer.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(company_rep.user)

        return Response({
            "id": company_rep.id,
            "email": company_rep.user.email,
            "first_name": company_rep.user.first_name,
            "last_name": company_rep.user.last_name,
            "company": company_rep.company.name,
            "role": company_rep.role,  
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=status.HTTP_201_CREATED)

