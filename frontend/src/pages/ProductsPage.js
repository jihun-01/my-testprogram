import React, { useEffect, useState } from 'react';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/products';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', sku: '', price: '', stock: '', location: '' });
  const [editingId, setEditingId] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [keyword]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(keyword);
      console.log('📦 fetchProducts 응답:', data);
  
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('❌ API 응답이 배열이 아님:', data);
        setProducts([]);
      }
    } catch (err) {
      console.error('❌ 상품 불러오기 실패:', err);
      setProducts([]);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    const numericPrice = parseFloat(form.price);
    const numericStock = parseInt(form.stock, 10);

    if (editingId) {
      await updateProduct(editingId, { ...form, price: numericPrice, stock: numericStock });
    } else {
      await createProduct({ ...form, price: numericPrice, stock: numericStock });
    }

    setForm({ name: '', sku: '', price: '', stock: '', location: '' });
    setEditingId(null);
    loadProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">상품 관리</h2>

      {/* 🔍 검색 */}
      <div className="mb-2 flex items-center space-x-2">
       <input
          className="border p-1 w-64"
          placeholder="상품명 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') loadProducts(); // 엔터로 검색 가능
          }}
        />
      <button
          className="bg-gray-300 px-3 py-1"
          onClick={loadProducts}
        >
          검색
        </button>
      </div>


      {/* 상품 등록/수정 */}
      <div className="mb-4 space-y-2">
        <input
          className="border p-1 mr-2"
          placeholder="상품명"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-1 mr-2"
          placeholder="SKU 번호"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
        />
        <input
          className="border p-1 mr-2"
          type="number"
          placeholder="가격"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          className="border p-1 mr-2"
          type="number"
          placeholder="재고"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <input
          className="border p-1 mr-2"
          placeholder="상품 위치"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-2 py-1"
          onClick={handleSubmit}
        >
          {editingId ? '수정 완료' : '상품 등록'}
        </button>
      </div>

      {/* 상품 목록 */}
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">상품명</th>
              <th className="border px-2 py-1">SKU</th>
              <th className="border px-2 py-1">가격</th>
              <th className="border px-2 py-1">재고</th>
              <th className="border px-2 py-1">위치</th>
              <th className="border px-2 py-1">액션</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="border px-2 py-1">{p.name}</td>
                <td className="border px-2 py-1">{p.sku}</td>
                <td className="border px-2 py-1">{p.price.toLocaleString()}원</td>
                <td className="border px-2 py-1">{p.stock}</td>
                <td className="border px-2 py-1">{p.location}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    className="text-blue-500"
                    onClick={() => handleEdit(p)}
                  >
                    수정
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(p.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductsPage;
