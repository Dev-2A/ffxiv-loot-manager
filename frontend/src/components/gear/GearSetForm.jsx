import React, { useState } from 'react';
import GearPieceCard from './GearPieceCard';
import SaveButton from '../common/SaveButton';
import { saveGearSet } from '../../api/gear';

const BIS_SLOTS = [
    '무기', '모자', '상의', '장갑', '하의', '신발',
    '귀걸이', '목걸이', '팔찌', '반지1', '반지2'
];

const GearSetForm = ({ bisType }) => {
    const [gearData, setGearData] = useState(
        BIS_SLOTS.map(slot => ({
            slot,
            itemType: '',
            itemName: '',
            materias: []
        }))
    );

    const handleUpdate = (index, newData) => {
        const updated = [...gearData];
        updated[index] = newData;
        setGearData(updated);
    };

    const handleSubmit = async () => {
        const playerId = 1; //TODO - 유저 선택 UI 또는 로그인 유저 ID로 대체
        const success = await saveGearSet(playerId, bisType, gearData);
        if (success) {
            alert('저장 완료!');
        } else {
            alert('저장  실패 ㅠㅠ');
        }
    };

    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gearData.map((gear, index) => (
                    <GearPieceCard
                        key={gear.slot}
                        index={index}
                        data={gear}
                        onUpdate={handleUpdate}
                    />
                ))}
            </div>
            <SaveButton onClick={handleSubmit} label={`${bisType === 'start' ? '출발' : '최종'} 비스 저장`} />
        </>
    );
};

export default GearSetForm;