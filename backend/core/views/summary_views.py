from rest_framework import viewsets
from core.models import ResourceSummary
from core.serializers import ResourceSummarySerializer

class ResourceSummaryViewSet(viewsets.ModelViewSet):
    queryset = ResourceSummary.objects.all()
    serializer_class = ResourceSummarySerializer