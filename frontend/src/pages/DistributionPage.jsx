import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const DistributionPage = () => {
    const [data, setData] = useState({});
    const [weeks, setWeeks] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`distribution/schedule/?weeks=${weeks}`);
                setData(res.data);
            } catch (err) {
                console.error('분배표 불러오기 실패', err);
            }
        };
        fetchData();
    }, [weeks]);

    const players = Object.keys(data);
    const maxWeeks = Math.max(...players.map(p => data[p].length), 0);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">주차별 자동 분배표</h1>
            <label className="block mb-2 text-sm">시뮬레이션 주차 수:</label>
            <input
                type="number"
                className="border p-2 rounded mb-6 w-32"
                min={1}
                max={20}
                value={weeks}
                onChange={e => setWeeks(Number(e.target.value))}
            />

            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">닉네임</th>
                            {Array.from({ length: maxWeeks }, (_, i) => (
                                <th key={i} className="border p-2 text-center">{i + 1}주차</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(player => (
                            <tr key={player}>
                                <td className="border p-2 font-medium whitespace-nowrap">{player}</td>
                                {data[player].map((slot, i) => (
                                    <td
                                        key={i}
                                        className="border p-2 text-center"
                                    >
                                        {slot ? slot : '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DistributionPage;