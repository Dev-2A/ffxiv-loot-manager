from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from collections import defaultdict
from core.models import Player, GearSet, GearPiece

SLOTS = [
    '무기', '모자', '상의', '장갑', '하의', '신발',
    '귀걸이', '목걸이', '팔찌', '반지1', '반지2'
]

# 층별 낱장 요구량 기준
LADDER_REQUIREMENTS = {
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

# 강화소재가 필요한 보강석판템 처리
UPGRADE_ITEMS = {
    '귀걸이': (2, 3),  # 경화약
    '목걸이': (2, 3),
    '팔찌': (2, 3),
    '반지1': (2, 3),
    '반지2': (2, 3),
    '모자': (3, 4),   # 강화섬유
    '장갑': (3, 4),
    '신발': (3, 4),
    '상의': (3, 4),
    '하의': (3, 4),
    '무기': (4, 4),   # 무기석판
}

class DistributionsSimulationView(APIView):
    def get(self, request):
        max_weeks = int(request.GET.get('weeks', 10))
        distribution_table = defaultdict(lambda: [None] * max_weeks)
        
        # 부위별로 필요 유저 정리
        for slot in SLOTS:
            user_queue = []
            
            for player in Player.objects.all():
                try:
                    gearset = GearSet.objects.get(player=player, type='final')
                    piece = GearPiece.objects.get(gearset=gearset, slot=slot)
                except GearPiece.DoesNotExist:
                    continue
                
                item_type = piece.item_type
                if item_type == '제작템':
                    continue # 점수 없음
                
                if item_type == '영웅레이드템':
                    floor, pages = LADDER_REQUIREMENTS.get(slot, (0, 0))
                elif item_type == '보강석판템':
                    floor, pages = UPGRADE_ITEMS.get(slot, (0, 0))
                else:
                    continue # 석판템 제외
                
                user_queue.append({
                    'nickname': player.nickname,
                    'slot': slot,
                    'pages': pages,
                    'floor': floor
                })
            
            # pages 수 기준 정렬 (높은 수가 우선순위 높음)
            sorted_queue = sorted(user_queue, key=lambda x: x['pages'], reverse=True)
            
            week_cursor = 0
            for user in sorted_queue:
                # 같은 주차에 아이템 이미 먹었으면 넘어가기
                while week_cursor < max_weeks and distribution_table[user['nickname']][week_cursor] is not None:
                    week_cursor += 1
                
                if week_cursor < max_weeks:
                    distribution_table[user['nickname']][week_cursor] = user['slot']
                    week_cursor += 1
        
        return Response(distribution_table, status=status.HTTP_200_OK)