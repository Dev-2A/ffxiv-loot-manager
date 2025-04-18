from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models.user import CustomUser
from .models.player import Role, Job

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'nickname', 'job', 'is_staff')
    fieldsets = UserAdmin.fieldsets + (
        ('추가 정보', {'fields': ('nickname', 'job')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('추가 정보', {'fields': ('nickname', 'job')}),
    )

admin.site.register(Role)
admin.site.register(Job)