from django.contrib import admin
from .models import Skill, Job, Application


# Skill admin
@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at", "updated_at")
    search_fields = ("name",)
    ordering = ("name",)


# Job admin
@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "company",
        "location",
        "job_type",
        "salary_range",
        "posted_at",
        "is_open",  # added
        "posted_by_name",
    )
    list_filter = ("job_type", "company", "location", "is_open")  # added is_open filter
    search_fields = ("title", "company__name", "description", "location")
    filter_horizontal = ("skills",)
    ordering = ("-posted_at",)

    def posted_by_name(self, obj):
        if obj.posted_by:
            user = obj.posted_by.user
            full_name = f"{user.first_name} {user.last_name}".strip()
            return f"{full_name or user.email} ({obj.posted_by.department})"
        return "-"

    posted_by_name.short_description = "Posted By"



# Application admin
@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("id", "job", "jobseeker", "status", "applied_at")
    list_filter = ("status", "job__company")
    search_fields = ("job__title", "jobseeker__user__email", "cover_letter")
    ordering = ("-applied_at",)
