from rest_framework import serializers
from .models import Application, Job, Skill
from users.serializers import (
    CompanySerializer,
    CompanyRepresentativeSerializer,
    JobSeekerSerializer,
)


class JobSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)  # nested serializer for full details
    skills = serializers.StringRelatedField(many=True, read_only=True)
    posted_by = CompanyRepresentativeSerializer(read_only=True)
    applications_count = serializers.IntegerField(read_only=True)  # ✅ add this

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "company",
            "location",
            "salary_range",
            "job_type",
            "posted_at",
            "skills",
            "description",
            "remote_status",
            "posted_by",
            "is_open",
            "applications_count",
        ]


class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    jobseeker = JobSeekerSerializer(read_only=True)

    class Meta:
        model = Application
        fields = [
            "id",
            "jobseeker",
            "cover_letter",
            "job",
            "applied_at",
            "resume",
            "status",
        ]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name"]
