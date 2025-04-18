import api from './axiosConfig';

export const saveGearSet = async (playerId, bisType, gearData) => {
    try {
        const res = await api.post('gearsets/', {
            player: playerId,
            type: bisType,
        });
        const gearSetId = res.data.id;

        for (const gear of gearData) {
            const gearPieceRes = await api.post('gearpieces/', {
                gearset: gearSetId,
                slot: gear.slot,
                item_name: gear.itemName,
                item_type: gear.itemType,
                requires_upgrade: false,
            });
            const gearPieceId = gearPieceRes.data.id;

            for (const materia of gear.materias) {
                if (materia) {
                    await api.post('materias/', {
                        gear_piece: gearPieceId,
                        type: materia,
                    });
                }
            }
        }

        return true;
    } catch (err) {
        console.error('BIS 저장 실패:', err);
        return false;
    }
};