import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

const PlayerSelect = ({ selectedId, onChange }) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const res = await api.get('players/');
                setPlayers(res.data);
            } catch (err) {
                console.error('플레이어 목록 불러오기 실패:', err);
            }
        };
        fetchPlayers();
    }, []);

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">플레이어 선택</label>
            <select
                className="w-full border rounded p-2"
                value={selectedId}
                onChange={e => onChange(Number(e.target.value))}
            >
                <option value="">플레이어를 선택하세요</option>
                {players.map(player => (
                    <option key={player.id} value={player.id}>
                        {player.nickname} ({player.job_name})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PlayerSelect;