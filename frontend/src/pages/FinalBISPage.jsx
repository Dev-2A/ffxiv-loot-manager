import React, { useState } from 'react';
import GearSetForm from '../components/gear/GearSetForm';
import PlayerSelect from '../components/player/PlayerSelect';

const FinalBISPage = () => {
    const [playerId, setPlayerId] = useState('');

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">최종 비스 등록</h1>
            <PlayerSelect selectedId={playerId} onChange={setPlayerId} />
            {playerId && <GearSetForm bisType="final" playerId={playerId} />}
        </div>
    );
};

export default FinalBISPage;