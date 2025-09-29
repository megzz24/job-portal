from rest_framework import serializers
from .models import Application, Job

class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.name", read_only=True)
    skills = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Job
        fields = ["id", "title", "company_name", "location", "job_type", "posted_at", "skills"]

class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)    

    class Meta:
        model = Application
        fields = ["id", "job", "applied_at", "status"]
