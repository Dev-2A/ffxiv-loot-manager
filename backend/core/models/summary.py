from django.db import models
from .player import Player

class ResourceSummary(models.Model):
    player = models.OneToOneField(Player, on_delete=models.CASCADE)
    total_tomes = models.PositiveIntegerField(default=0)
    page_1 = models.PositiveIntegerField(default=0)
    page_2 = models.PositiveIntegerField(default=0)
    page_3 = models.PositiveIntegerField(default=0)
    page_4 = models.PositiveIntegerField(default=0)
    fiber = models.PositiveIntegerField(default=0)
    solvent = models.PositiveIntegerField(default=0)
    weapon_stone = models.PositiveIntegerField(default=0)
    score = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.player.nickname}의 요구 자원"