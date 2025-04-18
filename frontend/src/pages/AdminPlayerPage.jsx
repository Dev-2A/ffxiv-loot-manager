// 📄 파일 경로: frontend/src/pages/AdminPlayerPage.jsx

import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import GearTable from '../components/gear/GearTable';

const AdminPlayerPage = () => {
  const [players, setPlayers] = useState([]);
  const [nickname, setNickname] = useState('');
  const [jobId, setJobId] = useState('');
  const [jobs, setJobs] = useState([]);
  const [startGearsets, setStartGearsets] = useState([]);
  const [finalGearsets, setFinalGearsets] = useState([]);

  const fetchData = async () => {
    try {
      const [playerRes, jobRes, startRes, finalRes] = await Promise.all([
        api.get('players/'),
        api.get('jobs/'),
        api.get('gearsets/?type=start'),
        api.get('gearsets/?type=final')
      ]);
      setPlayers(playerRes.data);
      setJobs(jobRes.data);
      setStartGearsets(startRes.data);
      setFinalGearsets(finalRes.data);
    } catch (err) {
      console.error('데이터 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!nickname || !jobId) return alert('닉네임과 직업을 모두 입력하세요.');
    try {
      await api.post('players/', { nickname, job: jobId });
      setNickname('');
      setJobId('');
      fetchData();
    } catch (err) {
      console.error('플레이어 생성 실패:', err);
      alert('플레이어 생성 실패: ' + (err.response?.data?.job || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제할까요?')) return;
    try {
      await api.delete(`players/${id}/`);
      fetchData();
    } catch (err) {
      console.error('플레이어 삭제 실패:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">플레이어 관리</h1>

      <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={jobId}
          onChange={e => setJobId(Number(e.target.value))}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="">직업 선택</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>{job.name}</option>
          ))}
        </select>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          플레이어 생성
        </button>
      </div>

      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">닉네임</th>
            <th className="p-2">직업</th>
            <th className="p-2">삭제</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id} className="border-t">
              <td className="p-2">{player.nickname}</td>
              <td className="p-2">
                <div className="flex items-center gap-2">
                  <img
                    src={`/icons/jobs/${player.job_name}.png`}
                    alt={player.job_name}
                    className="w-6 h-6"
                  />
                  <span>{player.job_name}</span>
                </div>
              </td>
              <td className="p-2">
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(player.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-8 mb-4">출발 BIS</h2>
      {players.map(player => {
        const gearset = startGearsets.find(g => g.player === player.id);
        return gearset ? (
          <div key={gearset.id} className="mb-6">
            <h3 className="font-semibold mb-2">{player.nickname}의 출발 BIS</h3>
            <GearTable
              gearPieces={gearset.pieces || []}
              onRefresh={fetchData}
            />
          </div>
        ) : null;
      })}

      <h2 className="text-xl font-semibold mt-8 mb-4">최종 BIS</h2>
      {players.map(player => {
        const gearset = finalGearsets.find(g => g.player === player.id);
        return gearset ? (
          <div key={gearset.id} className="mb-6">
            <h3 className="font-semibold mb-2">{player.nickname}의 최종 BIS</h3>
            <GearTable
              gearPieces={gearset.pieces || []}
              onRefresh={fetchData}
            />
          </div>
        ) : null;
      })}
    </div>
  );
};

export default AdminPlayerPage;
