from rest_framework import serializers
from core.models import GearSet, GearPiece, Materia
from .player_serializers import PlayerSerializer

class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materia
        fields = '__all__'

class GearPieceSerializer(serializers.ModelSerializer):
    materias = MateriaSerializer(many=True, read_only=True)
    
    class Meta:
        model = GearPiece
        fields = '__all__'

class GearSetSerializer(serializers.ModelSerializer):
    pieces = GearPieceSerializer(many=True, read_only=True)
    player = PlayerSerializer(read_only=True)
    
    class Meta:
        model = GearSet
        fields = '__all__'