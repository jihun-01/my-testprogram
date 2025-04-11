import React, { useEffect, useState } from 'react';
import {
  fetchOrders,
  createOrder,
  deleteOrder,
} from '../api/orders';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ product_id: '', quantity: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders();
      console.log("📦 주문 응답 데이터:", data);

      if (!Array.isArray(data)) {
        throw new Error("API 응답이 배열이 아닙니다");
      }

      setOrders(data);
      setError('');
    } catch (err) {
      console.error("❌ 주문 로딩 실패:", err);
      setOrders([]);
      setError('주문 데이터를 불러오지 못했습니다.');
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    try {
      await createOrder(newOrder);
      setNewOrder({ product_id: '', quantity: 1 });
      loadOrders();
    } catch (err) {
      console.error("❌ 주문 생성 실패:", err);
      setError('주문 생성 실패: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      loadOrders();
    } catch (err) {
      console.error("❌ 주문 삭제 실패:", err);
      setError('주문 삭제 실패: ' + err.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">주문 관리</h2>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <div className="mb-4">
        <input
          className="border p-1 mr-2"
          placeholder="상품 ID"
          value={newOrder.product_id}
          onChange={(e) =>
            setNewOrder({ ...newOrder, product_id: e.target.value })
          }
        />
        <input
          className="border p-1 mr-2"
          type="number"
          placeholder="수량"
          value={newOrder.quantity}
          onChange={(e) =>
            setNewOrder({ ...newOrder, quantity: Number(e.target.value) })
          }
        />
        <button className="bg-green-500 text-white px-2 py-1" onClick={handleCreate}>
          주문
        </button>
      </div>

      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <ul className="space-y-1">
          {orders.map((o) => (
            <li key={o.id} className="border p-2 flex justify-between">
              <div>상품 ID: {o.product_id}, 수량: {o.quantity}</div>
              <button className="text-red-500" onClick={() => handleDelete(o.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrdersPage;
