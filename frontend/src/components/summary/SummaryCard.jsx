import React from 'react';

const SummaryCard = ({ label, value, icon }) => (
    <div className="bg-white shadow p-4 rounded border">
        <div className="text-4xl mb-2">{icon}</div>
        <div className="text-sm text-gray-600 mb-1">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
    </div>
);

export default SummaryCard;