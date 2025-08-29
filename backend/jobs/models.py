from django.db import models
from users.models import Company, JobSeeker


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Job(models.Model):
    JOB_TYPE_CHOICES = [
        ("FT", "Full-Time"),
        ("PT", "Part-Time"),
        ("IN", "Internship"),
        ("CT", "Contract"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    job_type = models.CharField(max_length=2, choices=JOB_TYPE_CHOICES)
    salary_range = models.CharField(max_length=100, blank=True, null=True)

    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="jobs")
    skills = models.ManyToManyField(Skill, blank=True)

    posted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} at {self.company.name}"


class Application(models.Model):
    STATUS_CHOICES = [
        ("APPLIED", "Applied"),
        ("REVIEWED", "Reviewed"),
        ("ACCEPTED", "Accepted"),
        ("REJECTED", "Rejected"),
    ]

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    jobseeker = models.ForeignKey(
        JobSeeker, on_delete=models.CASCADE, related_name="applications"
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="APPLIED")
    cover_letter = models.TextField(blank=True, null=True)

    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("job", "jobseeker")  # prevent duplicate applications

    def __str__(self):
        return f"{self.jobseeker.user.email} → {self.job.title}"
