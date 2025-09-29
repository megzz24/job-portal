from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

# Core User model
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()
    
    @property
    def user_type(self):
        if hasattr(self, "jobseeker_profile"):
            return "jobseeker"
        elif hasattr(self, "companyrep_profile"):
            return "company_rep"
        return "admin"

    def __str__(self):
        return self.email

# JobSeeker profile
class JobSeeker(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='jobseeker_profile')
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    skills = models.ManyToManyField('jobs.Skill', blank=True, related_name='jobseekers')  # Link to skills

    def __str__(self):
        return f"{self.user.first_name or ''} {self.user.last_name or ''}".strip()

# Company model
class Company(models.Model):
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# CompanyRepresentative profile
class CompanyRepresentative(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='companyrep_profile')
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='representatives')
    role = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.user.first_name or ''} {self.user.last_name or ''} ({self.company.name})".strip()