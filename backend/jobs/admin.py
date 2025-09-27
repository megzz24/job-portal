from django.contrib import admin
from .models import Skill, Job, Application

# Skill admin
@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at', 'updated_at')
    search_fields = ('name',)
    ordering = ('name',)

# Job admin
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'company', 'location', 'job_type', 'salary_range', 'posted_at')
    list_filter = ('job_type', 'company', 'location')
    search_fields = ('title', 'company__name', 'description', 'location')
    filter_horizontal = ('skills',)
    ordering = ('-posted_at',)

# Application admin
@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('id', 'job', 'jobseeker', 'status', 'applied_at')
    list_filter = ('status', 'job__company')
    search_fields = ('job__title', 'jobseeker__user__email', 'cover_letter')
    ordering = ('-applied_at',)
