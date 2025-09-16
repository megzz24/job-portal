from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import JobSeeker, CompanyRepresentative
from .serializers import JobSeekerSerializer, CompanyRepresentativeSerializer

# JobSeeker Registration
class JobSeekerRegisterView(generics.CreateAPIView):
    serializer_class = JobSeekerSerializer
    permission_classes = [permissions.AllowAny]

# JobSeeker Profile View (Retrieve & Update)
class JobSeekerProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = JobSeekerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return JobSeeker.objects.get(user=self.request.user)

# JobSeeker Logout
class LogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        token = RefreshToken(refresh_token)
        token.blacklist()  # Blacklist the token
        return Response({"detail": "Logout successful"})

# Company Representative Registration
class CompanyRepRegisterView(generics.CreateAPIView):
    serializer_class = CompanyRepresentativeSerializer
    permission_classes = [permissions.AllowAny]

# Company Representative Profile View
class CompanyRepProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = CompanyRepresentativeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return CompanyRepresentative.objects.get(user=self.request.user)

