from django.contrib.auth.models import AbstractUser
from django.db import models
from core.models.player import Job

class CustomUser(AbstractUser):
    nickname = models.CharField(max_length=30, unique=True)
    job = models.ForeignKey(Job, on_delete=models.SET_NULL, null=True, blank=True)
    
    USERNAME_FIELD = 'username' # 기본은 username
    REQUIRED_FIELDS = ['nickname']
    
    def __str__(self):
        return self.nickname or self.username