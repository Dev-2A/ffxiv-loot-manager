from django.db import models
from .player import Player

class GearSet(models.Model):
    BIS_TYPE_CHOICES = [
        ('start', '출발 비스'),
        ('final', '최종 비스'),
    ]
    
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=BIS_TYPE_CHOICES)
    
    def __str__(self):
        return f"{self.player.nickname} - {self.get_type_display()}"

class GearPiece(models.Model):
    SLOT_CHOICES = [
        ('무기', '무기'),
        ('모자', '모자'),
        ('상의', '상의'),
        ('장갑', '장갑'),
        ('하의', '하의'),
        ('신발', '신발'),
        ('귀걸이', '귀걸이'),
        ('목걸이', '목걸이'),
        ('팔찌', '팔찌'),
        ('반지1', '반지1'),
        ('반지2', '반지2'),
    ]
    
    gearset = models.ForeignKey(GearSet, on_delete=models.CASCADE, related_name="pieces")
    slot = models.CharField(max_length=10, choices=SLOT_CHOICES)
    item_name = models.CharField(max_length=50)
    item_type = models.CharField(max_length=20) # 석판템, 보강석판템, 제작템, 영웅레이드템 등
    requires_upgrade = models.BooleanField(default=False)
    
    obtained = models.BooleanField(default=False) # 획득 여부
    obtained_week = models.PositiveIntegerField(null=True, blank=True) # 몇 주차에 획득했는지
    
    def __str__(self):
        return f"{self.slot} - {self.item_name}"

class Materia(models.Model):
    MATERIA_CHOICES = [
        ('무략', '극대'),
        ('야망', '의지'),
        ('심안', '직격'),
        ('기술속도', '기시'),
        ('시전속도', '마시'),
        ('신앙', '신앙'),
        ('강유', '강유'),
    ]
    
    gear_piece = models.ForeignKey(GearPiece, on_delete=models.CASCADE, related_name="materias")
    type = models.CharField(max_length=20, choices=MATERIA_CHOICES)
    
    def __str__(self):
        return f"{self.gear_piece.slot} - {self.type}"