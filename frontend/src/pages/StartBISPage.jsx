import React, { useState } from 'react';
import GearSetForm from '../components/gear/GearSetForm';
import PlayerSelect from '../components/player/PlayerSelect';

const StartBISPage = () => {
    const [playerId, setPlayerId] = useState('');

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">출발 비스 등록</h1>
            <PlayerSelect selectedId={playerId} onChange={setPlayerId} />
            {playerId && <GearSetForm bisType="start" playerId={playerId} />}
        </div>
    );
};

export default StartBISPage;