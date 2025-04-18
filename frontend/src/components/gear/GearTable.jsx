import React, { useState } from 'react';
import GearEditModal from './GearEditModal';
import api from '../../api/axiosConfig';

const GearTable = ({ gearPieces, onRefresh }) => {
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleDelete = async (id) => {
        if (!window.confirm('정말 삭제할까요?')) return;
        try {
            await api.delete(`gearpieces/${id}/`);
            onRefresh();
        } catch (err) {
            console.error('삭제 실패:', err);
        }
    };

    const openEditModal = (piece) => {
        setSelectedPiece(piece);
        setModalOpen(true);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border text-sm">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">부위</th>
                        <th className="p-2">아이템명</th>
                        <th className="p-2">종류</th>
                        <th className="p-2">강화</th>
                        <th className="p-2">마테리쟈 수</th>
                        <th className="p-2">수정</th>
                        <th className="p-2">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {gearPieces.map((piece) => (
                        <tr key={piece.id} className="border-t">
                            <td className="p-2">{piece.slot}</td>
                            <td className="p-2">{piece.item_name}</td>
                            <td className="p-2">{piece.item_type}</td>
                            <td className="p-2">{piece.requires_upgrade ? 'O' : 'X'}</td>
                            <td className="p-2">{piece.materias?.length || 0}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => openEditModal(piece)}
                                    className="text-blue-600 hover:underline"
                                >
                                    수정
                                </button>
                            </td>
                            <td className="p-2">
                                <button
                                    onClick={() => handleDelete(piece.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 수정 모달 */}
            {modalOpen && (
                <GearEditModal
                    piece={selectedPiece}
                    onClose={() => setModalOpen(false)}
                    onSaved={() => {
                        setModalOpen(false);
                        onRefresh();
                    }}
                />
            )}
        </div>
    );
};

export default GearTable;