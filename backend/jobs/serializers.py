from rest_framework import serializers
from .models import Job, Application, Skill
from users.models import JobSeeker, Company
from users.serializers import JobSeekerSerializer, CompanyRepresentativeSerializer

# Skill Serializer
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

# Job Serializer
class JobSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    skill_ids = serializers.PrimaryKeyRelatedField(
        many=True, write_only=True, queryset=Skill.objects.all(), source='skills'
    )

    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'location', 'job_type', 'salary_range', 'company', 'skills', 'skill_ids', 'posted_at']

    def create(self, validated_data):
        skills = validated_data.pop('skills', [])
        job = Job.objects.create(**validated_data)
        job.skills.set(skills)
        return job

    def update(self, instance, validated_data):
        skills = validated_data.pop('skills', [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        instance.skills.set(skills)
        return instance

# Application Serializer
class ApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    job_id = serializers.PrimaryKeyRelatedField(
        queryset=Job.objects.all(), write_only=True, source='job'
    )
    jobseeker = JobSeekerSerializer(read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'job', 'job_id', 'jobseeker', 'status', 'cover_letter', 'applied_at']

    def create(self, validated_data):
        job = validated_data.pop('job')
        jobseeker = self.context['request'].user.jobseeker
        application = Application.objects.create(job=job, jobseeker=jobseeker, **validated_data)
        return application

# Application Status Update Serializer
class ApplicationStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['status']
