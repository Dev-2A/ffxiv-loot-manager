from rest_framework.routers import DefaultRouter
from django.urls import path, include

from core.views import (
    RoleViewSet, JobViewSet, PlayerViewSet,
    GearSetViewSet, GearPieceViewSet, MateriaViewSet,
    RaidFloorViewSet, RaidDropViewSet,
    ResourceSummaryViewSet,
)

from core.views.priority_views import SlotPriorityView
from core.views.distribution_views import DistributionsSimulationView

router = DefaultRouter()

# player
router.register(r'roles', RoleViewSet)
router.register(r'jobs', JobViewSet)
router.register(r'players', PlayerViewSet)

# gear
router.register(r'gearsets', GearSetViewSet)
router.register(r'gearpieces', GearPieceViewSet)
router.register(r'materias', MateriaViewSet)

# raid
router.register(r'floors', RaidFloorViewSet)
router.register(r'drops', RaidDropViewSet)

# summary
router.register(r'summaries', ResourceSummaryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('priorites/slot/<str:slot>', SlotPriorityView.as_view(), name='slot-priority'),
    path('distribution/schedule/', DistributionsSimulationView.as_view(), name='distribution-schedule'),
]