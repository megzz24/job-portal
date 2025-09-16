from rest_framework import serializers
from .models import User, JobSeeker, Company, CompanyRepresentative
from django.contrib.auth.password_validation import validate_password

# Serializer for User model
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['id', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# Serializer for JobSeeker model
class JobSeekerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = JobSeeker
        fields = ['id', 'user', 'first_name', 'last_name', 'profile_picture', 'resume']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(
            email=user_data['email'],
            password=user_data['password']
        )
        jobseeker = JobSeeker.objects.create(user=user, **validated_data)
        return jobseeker

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        if 'email' in user_data:
            instance.user.email = user_data['email']
            instance.user.save()
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        return instance

# Serializer for Company model
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

# Serializer for CompanyRepresentative model
class CompanyRepresentativeSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    company = CompanySerializer()

    class Meta:
        model = CompanyRepresentative
        fields = ['id', 'user', 'first_name', 'last_name', 'company']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        company_data = validated_data.pop('company')
        
        company, created = Company.objects.get_or_create(name=company_data['name'], defaults=company_data)
        
        user = User.objects.create_user(
            email=user_data['email'],
            password=user_data['password']
        )
        
        rep = CompanyRepresentative.objects.create(
            user=user,
            company=company,
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        
        return rep

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        company_data = validated_data.pop('company', {})

        if 'email' in user_data:
            instance.user.email = user_data['email']
            instance.user.save()

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        return instance
