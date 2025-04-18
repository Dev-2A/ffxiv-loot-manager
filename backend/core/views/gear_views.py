from rest_framework import viewsets
from core.models import GearSet, GearPiece, Materia
from core.serializers import GearSetSerializer, GearPieceSerializer, MateriaSerializer

class GearSetViewSet(viewsets.ModelViewSet):
    queryset = GearSet.objects.all()
    serializer_class = GearSetSerializer

class GearPieceViewSet(viewsets.ModelViewSet):
    queryset = GearPiece.objects.all()
    serializer_class = GearPieceSerializer

class MateriaViewSet(viewsets.ModelViewSet):
    queryset = Materia.objects.all()
    serializer_class = MateriaSerializer