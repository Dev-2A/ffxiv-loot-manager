from django.db import models

class Role(models.Model):
    name = models.CharField(max_length=20)
    
    def __str__(self):
        return self.name

class Job(models.Model):
    name = models.CharField(max_length=30)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name

class Player(models.Model):
    nickname = models.CharField(max_length=30)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nickname