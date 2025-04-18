from rest_framework import serializers
from core.models import Role, Job, Player

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    job = serializers.PrimaryKeyRelatedField(queryset=Job.objects.all())
    job_name = serializers.CharField(source='job.name', read_only=True)
    
    class Meta:
        model = Player
        fields = ['id', 'nickname', 'job', 'job_name']