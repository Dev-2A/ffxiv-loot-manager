import React from 'react';

const MateriaSelect = ({ value, onChange, options }) => {
    return (
        <select
            className="border rounded p-1"
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            <option value="">선택</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
};

export default MateriaSelect;