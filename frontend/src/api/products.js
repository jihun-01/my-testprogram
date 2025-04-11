import axios from 'axios';

const API_URL = '/api/products';

// 전체 상품 조회
export const fetchProducts = async (keyword = '') => {
  const res = await axios.get(API_URL, { params: { keyword } });
  return res.data;
};

// 상품 등록
export const createProduct = async (product) => {
  await axios.post(API_URL, product);
};

// 상품 수정
export const updateProduct = async (id, product) => {
  await axios.put(`${API_URL}/${id}`, product);
};

// 상품 삭제
export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
