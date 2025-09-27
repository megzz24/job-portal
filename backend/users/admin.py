# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, JobSeeker, Company, CompanyRepresentative

# Custom User Admin
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_active', 'user_type')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )

# JobSeeker Admin
@admin.register(JobSeeker)
class JobSeekerAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_email')
    search_fields = ('user__email', 'user__first_name', 'user__last_name')
    filter_horizontal = ('skills',)

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'

# Company Admin
@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'website', 'location', 'industry', 'created_at')
    search_fields = ('name', 'website', 'location', 'industry')

# CompanyRepresentative Admin
@admin.register(CompanyRepresentative)
class CompanyRepresentativeAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_email', 'company', 'role')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'company__name', 'role')

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'
