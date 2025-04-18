from rest_framework import viewsets
from core.models import RaidFloor, RaidDrop
from core.serializers import RaidFloorSerializer, RaidDropSerializer

class RaidFloorViewSet(viewsets.ModelViewSet):
    queryset = RaidFloor.objects.all()
    serializer_class = RaidFloorSerializer

class RaidDropViewSet(viewsets.ModelViewSet):
    queryset = RaidDrop.objects.all()
    serializer_class = RaidDropSerializer