import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import StartBISPage from './pages/StartBISPage';
import FinalBISPage from './pages/FinalBISPage';
import BISOverviewPage from './pages/BISOverviewPage';
import LootSummaryPage from './pages/LootSummaryPage';
import DistributionPage from './pages/DistributionPage';
import ProgressDashboardPage from './pages/ProgressDashboardPage';
import AdminPlayerPage from './pages/AdminPlayerPage';

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-6 space-x-4 border-b pb-2">
          <Link to="/start-bis" className="text-blue-600 hover:underline">출발 BIS</Link>
          <Link to="/final-bis" className="text-blue-600 hover:underline">최종 BIS</Link>
          <Link to="/bis-overview" className="text-blue-600 hover:underline">BIS 현황</Link>
          <Link to="/loot-summary" className="text-blue-600 hover:underline">획득 요약</Link>
          <Link to="/distribution" className="text-blue-600 hover:underline">분배 시뮬레이션</Link>
          <Link to="/dashboard" className="text-blue-600 hover:underline">종합 대시보드</Link>
          <Link to="/admin/players" className="text-blue-600 hover:underline">플레이어 관리</Link>
        </nav>

        <Routes>
          <Route path="/start-bis" element={<StartBISPage />} />
          <Route path="/final-bis" element={<FinalBISPage />} />
          <Route path="/bis-overview" element={<BISOverviewPage />} />
          <Route path="/loot-summary" element={<LootSummaryPage />} />
          <Route path="/distribution" element={<DistributionPage />} />
          <Route path="/dashboard" element={<ProgressDashboardPage />} />
          <Route path="/admin/players" element={<AdminPlayerPage />} />
          <Route path="*" element={<StartBISPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
