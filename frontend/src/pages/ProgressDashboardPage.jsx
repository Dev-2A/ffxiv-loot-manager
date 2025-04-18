import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { matchRoutes } from 'react-router-dom';

const SLOTS = [
    '무기', '모자', '상의', '장갑', '하의', '신발',
    '귀걸이', '목걸이', '팔찌', '반지1', '반지2'
];

const ProgressDashboardPage = () => {
    const [players, setPlayers] = useState([]);
    const [gearsets, setGearsets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [playersRes, gearsetsRes] = await Promise.all([
                    api.get('players/'),
                    api.get('geaersets/?with_pieces=true')
                ]);
                setPlayers(playersRes.data);
                setGearsets(gearsetsRes.data);
            } catch (err) {
                console.error('데이터 불러오기 실패:', err);
            }
        };
        fetchData();
    }, []);

    const getGear = (playerId, type, slot) => {
        const gs = gearsets.find(g => g.player === playerId && g.type === type);
        if (!gs || !gs.pieces) return null;
        return gs.pieces.find(p => p.slot === slot);
    };

    const getRates = (playerId) => {
        let match = 0;
        let obtained = 0;

        SLOTS.forEach(slot => {
            const start = getGear(playerId, 'start', slot)?.item_name;
            const finalPiece = getGear(playerId, 'final', slot);
            const final = finalPiece?.item_name;
            const has = finalPiece?.obtained;

            if (start && final && start === final) match++;
            if (has) obtained++;
        });

        return {
            matchRate: Math.round((match / SLOTS.length) * 100),
            obtainedRate: Math.round((obtained / SLOTS.length) * 100),
        };
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">파밍 종합 대시보드</h1>
            <table className="min-w-full border text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border text-left">닉네임</th>
                        <th className="p-2 border text-center">BIS 일치율</th>
                        <th className="p-2 border text-center">획득률</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => {
                        const { matchRate, obtainedRate } = getRates(player.id);
                        return (
                            <tr key={player.id}>
                                <td className="p-2 border font-medium whitespace-nowrap flex items-center gap-2">
                                    <img
                                        src={`/icons/jobs/${player.job.name}.png`}
                                        alt={player.job.name}
                                        className="w-5 h-5"
                                    />
                                    {player.nickname}
                                </td>
                                <td className="p-2 border text-center">
                                    <div className="text-sm font-semibold">{matchRate}%</div>
                                    <div className="w-full bg-gray-200 rounded h-2 mt-1">
                                        <div
                                            className="bg-green-500 h-2 rounded"
                                            style={{ width: `${matchRate}%` }}
                                        />
                                    </div>
                                </td>
                                <td className="p-2 border text-center">
                                    <div className="text-sm font-semibold">{obtainedRate}%</div>
                                    <div className="w-full bg-gray-200 rounded h-2 mt-1">
                                        <div
                                            className="bg-blue-500 h-2 rounded"
                                            style={{ width: `${obtainedRate}%` }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ProgressDashboardPage;