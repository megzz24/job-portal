from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    ROLE_CHOICES = (
        ('job_seeker', 'Job Seeker'),
        ('company_rep', 'Company Representative'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, blank=True, null=True)