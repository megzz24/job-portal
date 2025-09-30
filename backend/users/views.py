from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import JobSeekerRegistrationSerializer, CompanyRepRegistrationSerializer, JobSeekerSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import JobSeeker
from rest_framework.parsers import MultiPartParser, FormParser

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

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
class JobSeekerProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = JobSeekerSerializer

    def get_object(self):
        # Returns the JobSeeker linked to the logged-in user
        return self.request.user.jobseeker_profile
    
    def get(self, request):
        profile = request.user.jobseeker_profile
        serializer = JobSeekerSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile = request.user.jobseeker_profile
        serializer = JobSeekerSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
class JobSeekerAvatarUpdateView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = JobSeekerSerializer

    def get_object(self):
        return self.request.user.jobseeker_profile

    def patch(self, request, *args, **kwargs):
        profile = self.get_object()
        avatar = request.FILES.get("avatar")

        if not avatar:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        profile.profile_picture = avatar
        profile.save()

        return Response({"profile_picture": profile.profile_picture.url}, status=status.HTTP_200_OK)
    
class JobSeekerResumeUploadView(generics.UpdateAPIView):
    serializer_class = JobSeekerSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        return self.request.user.jobseeker_profile

    def patch(self, request, *args, **kwargs):
        profile = self.get_object()
        resume_file = request.FILES.get("resume")
        if resume_file:
            profile.resume = resume_file
            profile.save()
        # return only resume field so other fields aren’t touched
        return Response({"resume": profile.resume.url})
