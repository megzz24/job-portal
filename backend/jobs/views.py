from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Job, Application, Skill
from .serializers import JobSerializer, ApplicationSerializer, ApplicationStatusUpdateSerializer, SkillSerializer

# Permissions
class IsCompanyRepresentative(permissions.BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'companyrepresentative')

class IsJobOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.company == request.user.companyrepresentative.company

# Job CRUD Views
class JobCreateView(generics.CreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyRepresentative]

    def perform_create(self, serializer):
        company = self.request.user.companyrepresentative.company
        serializer.save(company=company)

class JobListView(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['location', 'job_type']
    search_fields = ['title', 'description']

class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class JobUpdateView(generics.UpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyRepresentative, IsJobOwner]

class JobDeleteView(generics.DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyRepresentative, IsJobOwner]

# Application Views
class ApplicationCreateView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

class ApplicationListView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'jobseeker'):
            return Application.objects.filter(jobseeker=user.jobseeker)
        elif hasattr(user, 'companyrepresentative'):
            company = user.companyrepresentative.company
            return Application.objects.filter(job__company=company)
        return Application.objects.none()

class ApplicationDetailView(generics.RetrieveAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

class ApplicationStatusUpdateView(generics.UpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationStatusUpdateSerializer
    permission_classes = [permissions.IsAuthenticated, IsCompanyRepresentative]

# Skill Views
class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.AllowAny]

class SkillCreateView(generics.CreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
