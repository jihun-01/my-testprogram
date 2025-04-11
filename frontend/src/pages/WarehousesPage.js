import React, { useEffect, useState } from 'react';
import {
  fetchWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from '../api/warehouses';

function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [newWarehouse, setNewWarehouse] = useState({ name: '', location: '' });
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 창고 목록 불러오기
  const loadWarehouses = async () => {
    setLoading(true);
    try {
      const data = await fetchWarehouses();
      console.log('🚚 fetchWarehouses 응답 데이터:', data);
      console.log('데이터 타입 확인:', Array.isArray(data), typeof data);

      if (!Array.isArray(data)) {
        throw new Error('API 응답이 배열이 아님');
      }

      setWarehouses(data);
      setError('');
    } catch (err) {
      console.error('❌ 창고 목록 로딩 실패:', err);
      setError('창고 목록을 불러오는 중 오류 발생: ' + err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadWarehouses();
  }, []);

  const handleCreate = async () => {
    try {
      await createWarehouse(newWarehouse);
      setNewWarehouse({ name: '', location: '' });
      loadWarehouses();
    } catch (err) {
      console.error('등록 실패:', err);
      setError('등록 실패: ' + err.message);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateWarehouse(editingWarehouse.id, editingWarehouse);
      setEditingWarehouse(null);
      loadWarehouses();
    } catch (err) {
      console.error('수정 실패:', err);
      setError('수정 실패: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWarehouse(id);
      loadWarehouses();
    } catch (err) {
      console.error('삭제 실패:', err);
      setError('삭제 실패: ' + err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">창고 관리</h2>

      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              {editingWarehouse ? '창고 수정' : '창고 등록'}
            </h3>
            <input
              className="border p-1 mr-2"
              placeholder="창고명"
              value={editingWarehouse ? editingWarehouse.name : newWarehouse.name}
              onChange={(e) =>
                editingWarehouse
                  ? setEditingWarehouse({ ...editingWarehouse, name: e.target.value })
                  : setNewWarehouse({ ...newWarehouse, name: e.target.value })
              }
            />
            <input
              className="border p-1 mr-2"
              placeholder="위치"
              value={editingWarehouse ? editingWarehouse.location : newWarehouse.location}
              onChange={(e) =>
                editingWarehouse
                  ? setEditingWarehouse({ ...editingWarehouse, location: e.target.value })
                  : setNewWarehouse({ ...newWarehouse, location: e.target.value })
              }
            />
            {editingWarehouse ? (
              <button className="bg-blue-500 text-white px-2 py-1" onClick={handleUpdate}>
                수정
              </button>
            ) : (
              <button className="bg-green-500 text-white px-2 py-1" onClick={handleCreate}>
                등록
              </button>
            )}
          </div>

          <ul className="space-y-1">
            {warehouses.map((w) => (
              <li key={w.id} className="border p-2 flex justify-between items-center">
                <div>
                  <strong>{w.name}</strong> - {w.location}
                </div>
                <div className="space-x-2">
                  <button
                    className="text-blue-500"
                    onClick={() => setEditingWarehouse(w)}
                  >
                    수정
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(w.id)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default WarehousesPage;
