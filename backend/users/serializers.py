from rest_framework import serializers
from .models import User, JobSeeker, CompanyRepresentative, Company
from jobs.models import Skill, Job
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
        fields = [
            "email",
            "password",
            "first_name",
            "last_name",
            "profile_picture",
            "resume",
            "skills",
        ]

    def create(self, validated_data):
        skills_data = validated_data.pop("skills", [])
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        first_name = validated_data.pop("first_name", "")
        last_name = validated_data.pop("last_name", "")

        # Create User
        user = User.objects.create_user(
            email=email, password=password, first_name=first_name, last_name=last_name
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
    department = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = CompanyRepresentative
        fields = [
            "email",
            "password",
            "first_name",
            "last_name",
            "profile_picture",
            "department",
            "company_id",
            "company_name",
        ]

    def validate(self, attrs):
        # Either company_id or company_name must be provided
        if not attrs.get("company_id") and not attrs.get("company_name"):
            raise serializers.ValidationError(
                "Provide either company_id or company_name"
            )
        return attrs

    def create(self, validated_data):
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        first_name = validated_data.pop("first_name", "")
        last_name = validated_data.pop("last_name", "")
        company_id = validated_data.pop("company_id", None)
        company_name = validated_data.pop("company_name", None)

        # Create User
        user = User.objects.create_user(
            email=email, password=password, first_name=first_name, last_name=last_name
        )

        # Get or create Company
        if company_id:
            company = Company.objects.get(id=company_id)
        else:
            company, created = Company.objects.get_or_create(name=company_name)

        # Create CompanyRepresentative profile
        company_rep = CompanyRepresentative.objects.create(
            user=user, company=company, **validated_data
        )
        return company_rep


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token["user_type"] = user.user_type
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user_type"] = self.user.user_type
        return data


class JobSeekerSerializer(serializers.ModelSerializer):
    skills = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(), many=True, required=False
    )
    skill_names = serializers.SerializerMethodField()
    first_name = serializers.CharField(source="user.first_name", required=False)
    last_name = serializers.CharField(source="user.last_name", required=False)
    email = serializers.EmailField(source="user.email", read_only=True)

    saved_jobs = serializers.PrimaryKeyRelatedField(
        queryset=Job.objects.all(), many=True, required=False
    )
    saved_job_titles = serializers.SerializerMethodField()

    class Meta:
        model = JobSeeker
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "profile_picture",
            "resume",
            "field_name",
            "location",
            "about",
            "experience",
            "education",
            "skills",
            "skill_names",
            "saved_jobs",  # ✅ add this
            "saved_job_titles",  # ✅ add this
        ]
        read_only_fields = ("user",)

    def update(self, instance, validated_data):
        # Update user fields
        first_name = validated_data.pop("first_name", None)
        last_name = validated_data.pop("last_name", None)
        if first_name is not None:
            instance.user.first_name = first_name
        if last_name is not None:
            instance.user.last_name = last_name
        instance.user.save()

        # Update skills
        skills_data = validated_data.pop("skills", None)
        if skills_data is not None:
            instance.skills.set(skills_data)

        # Update saved jobs
        saved_jobs_data = validated_data.pop("saved_jobs", None)
        if saved_jobs_data is not None:
            instance.saved_jobs.set(saved_jobs_data)

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

    def get_skill_names(self, obj):  # 👈 must match the field name
        return [skill.name for skill in obj.skills.all()]

    def get_saved_job_titles(self, obj):
        return [job.title for job in obj.saved_jobs.all()]


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = [
            "id",
            "name",
            "description",
            "website",
            "location",
            "industry",
            "company_size",
            "founded_date", 
            "email",
            "phone_number",
            "linkedin",
            "logo",
        ]  # or list specific fields you want

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "email"]

class CompanyRepresentativeSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    company = CompanySerializer(read_only=True)
    user = UserSerializer(read_only=True)  # nested user object

    class Meta:
        model = CompanyRepresentative
        fields = ["id", "name", "user", "department", "profile_picture", "company"]

    def get_name(self, obj):
        # Return full name if available, otherwise username
        user = obj.user
        full_name = f"{user.first_name} {user.last_name}".strip()
        return full_name or user.email

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})
        if "first_name" in user_data:
            instance.user.first_name = user_data["first_name"]
        if "last_name" in user_data:
            instance.user.last_name = user_data["last_name"]
        instance.user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance