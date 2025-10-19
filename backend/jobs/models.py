from django.db import models
from django.utils import timezone
from users.models import CompanyRepresentative

# Skill model
class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Job model
class Job(models.Model):
    JOB_TYPE_CHOICES = [
        ('full-time', 'Full-time'),
        ('part-time', 'Part-time'),
        ('internship', 'Internship'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=100)
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES)
    salary_range = models.CharField(max_length=50, blank=True, null=True)
    company = models.ForeignKey('users.Company', on_delete=models.CASCADE, related_name='jobs')
    skills = models.ManyToManyField('Skill', blank=True, related_name='jobs')
    posted_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    remote_status = models.CharField(max_length=3, choices=[("Yes", "Yes"), ("No", "No")], default="No")
    posted_by = models.ForeignKey(
        CompanyRepresentative, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name="posted_jobs"
    )
    is_open = models.BooleanField(default=True)  

    def save(self, *args, **kwargs):
        if self.posted_by and self.company != self.posted_by.company:
            raise ValueError("Job company must match the representative's company")
        super().save(*args, **kwargs)

    
    class Meta:
        ordering = ['-posted_at']

    def __str__(self):
        return f"{self.title} at {self.company.name}"

# Application model
class Application(models.Model):
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('review', 'Review'),
        ('rejected', 'Rejected'),
        ('accepted', 'Accepted'),
        ('interview', 'Interview')
    ]

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    jobseeker = models.ForeignKey('users.JobSeeker', on_delete=models.CASCADE, related_name='applications')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    cover_letter = models.TextField(blank=True, null=True)
    applied_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    
    class Meta:
        ordering = ['-applied_at']
        constraints = [
            models.UniqueConstraint(fields=['job', 'jobseeker'], name='unique_application')
        ]

    def __str__(self):
        return f"{self.jobseeker.user.first_name or ''} {self.jobseeker.user.last_name or ''} applied to {self.job.title}"
