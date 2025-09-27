from rest_framework import serializers
from .models import User, JobSeeker, CompanyRepresentative, Company
from jobs.models import Skill
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class JobSeekerRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, min_length=6)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    skills = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(), many=True, required=False
    )

    class Meta:
        model = JobSeeker
        fields = ['email', 'password', 'first_name', 'last_name', 'profile_picture', 'resume', 'skills']

    def create(self, validated_data):
        skills_data = validated_data.pop('skills', [])
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')

        # Create User
        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )

        # Create JobSeeker profile
        jobseeker = JobSeeker.objects.create(user=user, **validated_data)
        jobseeker.skills.set(skills_data)  # Add skills if any
        return jobseeker

class CompanyRepRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, min_length=6)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    company_id = serializers.IntegerField(required=False, write_only=True)
    company_name = serializers.CharField(required=False, write_only=True)
    role = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = CompanyRepresentative
        fields = ['email', 'password', 'first_name', 'last_name', 'profile_picture', 'role', 'company_id', 'company_name']

    def validate(self, attrs):
        # Either company_id or company_name must be provided
        if not attrs.get('company_id') and not attrs.get('company_name'):
            raise serializers.ValidationError("Provide either company_id or company_name")
        return attrs

    def create(self, validated_data):
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')
        company_id = validated_data.pop('company_id', None)
        company_name = validated_data.pop('company_name', None)

        # Create User
        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )

        # Get or create Company
        if company_id:
            company = Company.objects.get(id=company_id)
        else:
            company, created = Company.objects.get_or_create(name=company_name)

        # Create CompanyRepresentative profile
        company_rep = CompanyRepresentative.objects.create(user=user, company=company, **validated_data)
        return company_rep
    
