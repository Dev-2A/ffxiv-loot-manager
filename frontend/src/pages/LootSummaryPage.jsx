import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const SLOTS = [
    '무기', '모자', '상의', '장갑', '하의', '신발',
    '귀걸이', '목걸이', '팔찌', '반지1', '반지2'
];

const LootSummaryPage = () => {
    const [gearData, setGearData] = useState([]);
    const [players, setPlayers] = useState([]);
    const [slotFilter, setSlotFilter] = useState('전체');

    useEffect(() => {
        const fetch = async () => {
            try {
                const [playersRes, gearsetsRes] = await Promise.all([
                    api.get('players/'),
                    api.get('gearpieces/')
                ]);
                setPlayers(playersRes.data);
                setGearData(gearsetsRes.data.filter(p => p.obtained && p.obtained_week));
            } catch (e) {
                console.error('획득 요약 불러오기 실패:', e);
            }
        };
        fetch();
    }, []);

    const getNickname = (playerId) => {
        return players.find(p => p.id === playerId)?.nickname || 'Unknown';
    };

    const getSlotOrderTable = () => {
        const bySlot = {};
        (slotFilter === '전체' ? SLOTS : [slotFilter]).forEach(slot => {
            bySlot[slot] = gearData
                .filter(p => p.slot === slot)
                .sort((a, b) => a.obtained_week - b.obtained_week);
        });
        return bySlot;
    };

    const getWeeklyCountTable = () => {
        const countByWeek = {};
        gearData.forEach(p => {
            if (p.obtained_week) {
                if (!countByWeek[p.obtained_week]) countByWeek[p.obtained_week] = 0;
                countByWeek[p.obtained_week]++;
            }
        });
        return countByWeek;
    };

    const slotOrder = getSlotOrderTable();
    const weekSummary = getWeeklyCountTable();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">획득 요약</h1>

            <div className="mb-4">
                <label className="mr-2 font-medium">슬롯필터:</label>
                <select
                    className="border p-1 rounded"
                    value={slotFilter}
                    onChange={e => setSlotFilter(e.target.value)}
                >
                    <option value="전체">전체</option>
                    {SLOTS.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                    ))}
                </select>
            </div>

            <h2 className="text-xl font-semibold mt-4 mb-2">🎯 슬롯별 획득 순서</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm mb-8">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2 text-left">부위</th>
                            <th className="border p-2 text-left">획득자 (주차)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(slotOrder).map(slot => (
                            <tr key={slot}>
                                <td className="border p-2 font-medium whitespace-nowrap">{slot}</td>
                                <td className="border p-2">
                                    {slotOrder[slot].length === 0 ? '-' : (
                                        <ul className="list-disc ml-4">
                                            {slotOrder[slot].map((p, i) => (
                                                <li key={i}>{getNickname(p.player)} ({p.obtained_week}주차)</li>
                                            ))}
                                        </ul>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2 className="text-xl font-semibold mt-4 mb-2">📊 주차별 획득 개수</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">주차</th>
                            <th className="border p-2">획득 수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(weekSummary).sort((a, b) => a - b).map(week => (
                            <tr key={week}>
                                <td className="border p-2">{week}주차</td>
                                <td className="border p-2">{weekSummary[week]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LootSummaryPage;