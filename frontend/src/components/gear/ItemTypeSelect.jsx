import React from 'react';

const ITEM_TYPES = ['석판템', '일반레이드템', '제작템'];

const ItemTypeSelect = ({ value, onChange }) => {
    return (
        <select
            className="w-full border rounded p-1 mb-2"
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            <option value="">선택</option>
            {ITEM_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
            ))}
        </select>
    );
};

export default ItemTypeSelect;