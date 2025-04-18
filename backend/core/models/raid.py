from django.db import models
from .player import Player

class RaidFloor(models.Model):
    FLOOR_CHOICES = [
        (1, '1층'), (2, '2층'), (3, '3층'), (4, '4층')
    ]
    number = models.IntegerField(choices=FLOOR_CHOICES)
    
    def __str__(self):
        return f"{self.get_number_display()}"

class RaidDrop(models.Model):
    week = models.PositiveIntegerField()
    floor = models.ForeignKey(RaidFloor, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=50)
    item_slot = models.CharField(max_length=10)
    winner = models.ForeignKey(Player, on_delete=models.SET_NULL, null=True, blank=True)
    is_pick = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.week}주차 {self.floor} - {self.item_name}"