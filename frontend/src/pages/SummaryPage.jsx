import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import SummaryCard from '../components/summary/SummaryCard';
import PlayerSelect from '../components/player/PlayerSelect';

const SummaryPage = () => {
    const [summary, setSummary] = useState(null);
    const [playerId, setPlayerId] = useState('');

    useEffect(() => {
        if (!playerId) return;
        const fetchSummary = async () => {
            try {
                const res = await api.get(`summaries/${playerId}`);
                setSummary(res.data);
            } catch (err) {
                console.error('요약 정보 불러오기 실패:', err);
                setSummary(null);
            }
        };
        fetchSummary();
    }, [playerId]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">내 BIS 요약</h1>
            <PlayerSelect selectedId={playerId} onChange={setPlayerId} />

            {!playerId && <p className="text-gray-500">플레이어를 선택하세요.</p>}
            {playerId && !summary && <p className="text-gray-500">요약 정보를 불러오는 중...</p>}

            {summary && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:crid-cols-3 gap-4">
                    <SummaryCard label="총 석판" value={summary.total_tomes} icon="💰" />
                    <SummaryCard label="1층 낱장" value={summary.page_1} icon="📘" />
                    <SummaryCard label="2층 낱장" value={summary.page_2} icon="📗" />
                    <SummaryCard label="3층 낱장" value={summary.page_3} icon="📙" />
                    <SummaryCard label="4층 낱장" value={summary.page_4} icon="📕" />
                    <SummaryCard label="강화섬유" value={summary.fiber} icon="🧵" />
                    <SummaryCard label="경화약" value={summary.solvent} icon="🧪" />
                    <SummaryCard label="무기석판" value={summary.weapon_stone} icon="⚔️" />
                    <SummaryCard label="우선순위 점수" value={summary.score} icon="⭐" />
                </div>
            )}
        </div>
    );
};

export default SummaryPage;