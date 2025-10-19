# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, JobSeeker, Company, CompanyRepresentative
from django.utils.html import format_html
import json


# Custom User Admin
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("email", "first_name", "last_name", "is_staff", "is_active")
    list_filter = ("is_staff", "is_active")
    search_fields = ("email", "first_name", "last_name")
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (
            "Important dates",
            {"fields": ("last_login",)},
        ),  # ✅ removed created_at & updated_at
    )

    readonly_fields = ("created_at", "updated_at")  # ✅ show them as read-only

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )


# JobSeeker Admin
@admin.register(JobSeeker)
class JobSeekerAdmin(admin.ModelAdmin):
    list_display = ("user", "get_email", "field_name", "location")
    search_fields = (
        "user__email",
        "user__first_name",
        "user__last_name",
        "field_name",
        "location",
    )
    filter_horizontal = ("skills",)
    readonly_fields = ("profile_preview",)

    fieldsets = (
        (None, {"fields": ("user", "profile_picture", "resume")}),
        ("Profile Info", {"fields": ("field_name", "location", "about", "skills")}),
        ("Experience & Education", {"fields": ("experience", "education")}),
    )

    def profile_preview(self, obj):
        if obj.profile_picture:
            return format_html(
                '<img src="{}" style="max-height: 100px;" />', obj.profile_picture.url
            )
        return "-"

    profile_preview.short_description = "Profile Picture Preview"

    # Display user's email
    def get_email(self, obj):
        return obj.user.email

    get_email.short_description = "Email"

    # Optional: Pretty-print JSON fields in admin
    def experience_pretty(self, obj):
        return json.dumps(obj.experience, indent=2)

    experience_pretty.short_description = "Experience"

    def education_pretty(self, obj):
        return json.dumps(obj.education, indent=2)

    education_pretty.short_description = "Education"


# Company Admin
@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "website", "location", "industry", "created_at")
    search_fields = ("name", "website", "location", "industry")


# CompanyRepresentative Admin
@admin.register(CompanyRepresentative)
class CompanyRepresentativeAdmin(admin.ModelAdmin):
    list_display = ("user", "get_email", "company", "department")
    search_fields = (
        "user__email",
        "user__first_name",
        "user__last_name",
        "company__name",
        "department",
    )

    def get_email(self, obj):
        return obj.user.email

    get_email.short_description = "Email"
