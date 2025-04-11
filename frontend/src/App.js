import React, { useState } from 'react';
import OrdersPage from './pages/OrdersPage';
import WarehousesPage from './pages/WarehousesPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  const [activeTab, setActiveTab] = useState('products'); // 기본 탭: 상품관리

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-6 text-center">📦 물류 관리 프로그램</h1>

      {/* 탭 버튼 */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('products')}
        >
          상품관리
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('orders')}
        >
          주문관리
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'warehouses' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('warehouses')}
        >
          창고관리
        </button>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="border p-4 rounded shadow bg-white">
        {activeTab === 'products' && <ProductsPage />}
        {activeTab === 'orders' && <OrdersPage />}
        {activeTab === 'warehouses' && <WarehousesPage />}
      </div>
    </div>
  );
}

export default App;
