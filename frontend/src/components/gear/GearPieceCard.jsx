import React from 'react';
import ItemTypeSelect from './ItemTypeSelect';
import MateriaSelect from './MateriaSelect';

const MATERIA_TYPES = ['특화', '의지', '직격', '기시', '마시', '신앙', '강유'];

const GearPieceCard = ({ index, data, onUpdate }) => {
    const handleChange = (field, value) => {
        const updated = { ...data, [field]: value };

        if (field === 'itemType') {
            if (value === '제작템') {
                updated.materias = Array(5).fill('');
            } else if (['무기', '모자', '장갑', '하의', '신발'].includes(data.slot)) {
                updated.materias = Array(2).fill('');
            } else {
                updated.materias = Array(1).fill('');
            }
        }

        onUpdate(index, updated);
    };

    const handleMateriaChange = (mIndex, value) => {
        const updated = { ...data };
        updated.materias[mIndex] = value;
        onUpdate(index, updated);
    };

    return (
        <div className="bg-white shadow rounded-lg p-4 border">
            <h2 className="font-semibold text-lg mb-2">{data.slot}</h2>

            <label className="block text-sm mb-1">아이템 종류</label>
            <ItemTypeSelect
                value={data.itemType}
                onChange={value => handleChange('itemType', value)}
            />

            <label className="block text-sm mb-1">아이템 이름</label>
            <input
                type="text"
                className="w-full border rounded p-1 mb-2"
                value={data.itemName}
                onChange={e => handleChange('itemName', e.target.value)}
            />

            <label className="block text-sm mb-1">마테리쟈</label>
            <div className="flex flex-wrap gap-2">
                {data.materias.map((mat, mIndex) => (
                    <MateriaSelect
                        key={mIndex}
                        value={mat}
                        onChange={value => handleMateriaChange(mIndex, value)}
                        options={MATERIA_TYPES}
                    />
                ))}
            </div>
        </div>
    );
};

export default GearPieceCard;