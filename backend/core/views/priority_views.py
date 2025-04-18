from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from core.models import Player, GearSet, GearPiece

# 부위별 영웅레이드템 낱장 요구량
RAID_ITEM_PAGES = {
    '귀걸이': (1, 3),
    '목걸이': (1, 3),
    '팔찌': (1, 3),
    '반지1': (1, 3),
    '반지2': (1, 3),
    '모자': (2, 4),
    '장갑': (2, 4),
    '신발': (2, 4),
    '상의': (3, 6),
    '하의': (3, 6),
    '무기': (4, 8),
}

# 보강석판템은 강화소재에 해당하는 낱장 수만큼 소모
UPGRADE_PAGES = {
    '귀걸이': (2, 3),
    '목걸이': (2, 3),
    '팔찌': (2, 3),
    '반지1': (2, 3),
    '반지2': (2, 3),
    '모자': (3, 4),
    '장갑': (3, 4),
    '신발': (3, 4),
    '상의': (3, 4),
    '하의': (3, 4),
    '무기': (4, 4),
}

class SlotPriorityView(APIView):
    """
    특정 부위(slot)에 대한 우선순위 정렬
    GET /api/priorities/slot/귀걸이/
    """
    
    def get(self, request, slot):
        priority_list = []
        
        for player in Player.objects.all():
            try:
                gearset = GearSet.objects.get(player=player, type='final')
                gear = GearPiece.objects.get(gearset=gearset, slot=slot)
            except GearPiece.DoesNotExist:
                continue
            
            kind = gear.item_type
            
            if kind == '제작템':
                continue # 점수 없음
            
            if kind == '영웅레이드템':
                floor, pages = RAID_ITEM_PAGES.get(slot, (0, 0))
            elif kind == '보강석판템':
                floor, pages = UPGRADE_PAGES.get(slot, (0, 0))
            else:
                continue # 석판템 등은 무시
            
            priority_list.append({
                'nickname': player.nickname,
                'item_type': kind,
                'required_pages': pages,
                'floor': floor,
                'score': pages # 낱장 수 = 점수
            })
        
        # 점수 기준 정렬 (높을수록 우선순위 높음)
        sorted_result = sorted(priority_list, key=lambda x: x['score'], reverse=True)
        
        return Response(sorted_result, status=status.HTTP_200_OK)