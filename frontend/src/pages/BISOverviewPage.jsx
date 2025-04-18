import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const SLOTS = [
  '무기', '모자', '상의', '장갑', '하의', '신발',
  '귀걸이', '목걸이', '팔찌', '반지1', '반지2'
];

const BISOverviewPage = () => {
  const [players, setPlayers] = useState([]);
  const [gearsets, setGearsets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersRes, gearsetsRes] = await Promise.all([
          api.get('players/'),
          api.get('gearsets/?with_pieces=true')
        ]);
        setPlayers(playersRes.data);
        setGearsets(gearsetsRes.data);
      } catch (err) {
        console.error('BIS 현황 데이터 불러오기 실패:', err);
      }
    };
    fetchData();
  }, []);

  const getGear = (playerId, type, slot) => {
    const gs = gearsets.find(gs => gs.player === playerId && gs.type === type);
    if (!gs || !gs.pieces) return null;
    return gs.pieces.find(p => p.slot === slot);
  };

  const handleCopyToFinal = async (playerId, slot) => {
    const start = getGear(playerId, 'start', slot);
    const final = getGear(playerId, 'final', slot);
    if (!start || !final) return;

    try {
      await api.patch(`gearpieces/${final.id}/`, { item_name: start.item_name });
      const updatedGearsets = gearsets.map(gs => {
        if (gs.player === playerId && gs.type === 'final') {
          return {
            ...gs,
            pieces: gs.pieces.map(p =>
              p.slot === slot ? { ...p, item_name: start.item_name } : p
            )
          };
        }
        return gs;
      });
      setGearsets(updatedGearsets);
    } catch (err) {
      console.error('최종 BIS 업데이트 실패:', err);
    }
  };

  const handleToggleObtained = async (pieceId, playerId, slot) => {
    const target = getGear(playerId, 'final', slot);
    if (!target || target.id !== pieceId) return;
    try {
      await api.patch(`gearpieces/${pieceId}/`, { obtained: !target.obtained });
      const updatedGearsets = gearsets.map(gs => {
        if (gs.player === playerId && gs.type === 'final') {
          return {
            ...gs,
            pieces: gs.pieces.map(p =>
              p.id === pieceId ? { ...p, obtained: !p.obtained } : p
            )
          };
        }
        return gs;
      });
      setGearsets(updatedGearsets);
    } catch (err) {
      console.error('획득 여부 수정 실패:', err);
    }
  };

  const calculateMatchRate = (playerId) => {
    let matched = 0;
    SLOTS.forEach(slot => {
      const start = getGear(playerId, 'start', slot)?.item_name;
      const final = getGear(playerId, 'final', slot)?.item_name;
      if (start && final && start === final) matched++;
    });
    return Math.round((matched / SLOTS.length) * 100);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">파티 BIS 현황</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">닉네임<br /><span className="text-xs text-gray-400">(일치율)</span></th>
              {SLOTS.map(slot => (
                <th key={slot} className="p-2 border text-center">{slot}<br /><span className="text-xs text-gray-400">(출발 / 최종)</span></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map(player => {
              const matchRate = calculateMatchRate(player.id);
              const matchColor =
                matchRate === 100 ? 'bg-green-100' :
                matchRate >= 70 ? 'bg-yellow-100' :
                'bg-red-100';
              return (
                <tr key={player.id} className={matchColor}>
                  <td className="p-2 border font-semibold whitespace-nowrap flex items-center gap-2">
                    <img
                      src={`/icons/jobs/${player.job_name}.png`}
                      alt={player.job_name}
                      className="w-5 h-5"
                    />
                    <div>
                      {player.nickname}
                      <div className="text-xs text-gray-500">{matchRate}%</div>
                    </div>
                  </td>
                  {SLOTS.map(slot => {
                    const start = getGear(player.id, 'start', slot)?.item_name || '-';
                    const finalGear = getGear(player.id, 'final', slot);
                    const final = finalGear?.item_name || '-';
                    const isMatched = start === final && start !== '-';
                    const obtained = finalGear?.obtained;
                    return (
                      <td
                        key={slot}
                        className={`p-2 border text-center whitespace-nowrap ${isMatched ? 'bg-green-50' : 'bg-red-50'}`}
                      >
                        <div>{start}</div>
                        <div className="text-xs text-gray-500">{final}</div>
                        {!isMatched && start !== '-' && final !== '-' && (
                          <button
                            className="text-xs text-blue-600 hover:underline mt-1"
                            onClick={() => handleCopyToFinal(player.id, slot)}
                          >
                            출발 → 최종 복사
                          </button>
                        )}
                        {final !== '-' && (
                          <div className="mt-1">
                            <label className="text-xs">
                              <input
                                type="checkbox"
                                className="mr-1"
                                checked={obtained || false}
                                onChange={() => handleToggleObtained(finalGear.id, player.id, slot)}
                              />획득함
                            </label>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BISOverviewPage;