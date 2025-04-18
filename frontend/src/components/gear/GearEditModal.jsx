import React, { useState } from 'react';
import api from '../../api/axiosConfig';

const GearEditModal = ({ piece, onClose, onSaved }) => {
    const [form, setForm] = useState({
        item_name: piece.item_name,
        item_type: piece.item_type,
        requires_upgrade: piece.requires_upgrade,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSave = async () => {
        try {
            await api.patch(`gearpieces/${piece.id}/`, form);
            onSaved();
        } catch (err) {
            console.error('수정 실패:', err);
            alert('수정 실패: ' + err.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-lg font-bold mb-4">장비 수정</h2>

                <div className="mb-4">
                    <label className="block text-sm mb-1">아이템명</label>
                    <input
                        type="text"
                        name="item_name"
                        value={form.item_name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm mb-1">아이템 종류</label>
                    <select
                        name="item_type"
                        value={form.item_type}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="제작템">제작템</option>
                        <option value="석판템">석판템</option>
                        <option value="보강석판템">보강석판템</option>
                        <option value="영웅레이드템">영웅레이드템</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="requires_upgrade"
                            checked={form.requires_upgrade}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        강화 여부
                    </label>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={handleChange}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GearEditModal;