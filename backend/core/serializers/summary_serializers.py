from rest_framework import serializers
from core.models import ResourceSummary
from .player_serializers import PlayerSerializer

class ResourceSummarySerializer(serializers.ModelSerializer):
    player = PlayerSerializer(read_only=True)
    
    class Meta:
        model = ResourceSummary
        fields = '__all__'