from rest_framework import serializers
from core.models import RaidFloor, RaidDrop

class RaidFloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = RaidFloor
        fields = '__all__'

class RaidDropSerializer(serializers.ModelSerializer):
    class Meta:
        model = RaidDrop
        fields = '__all__'