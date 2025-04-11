import axios from 'axios';

const API_URL = 'http://localhost:3000/api/warehouses';

export const fetchWarehouses = async () => {
  const response = await axios.get(API_URL);
  console.log('axios 응답 전체:', response); 
  return response.data;
};

export const createWarehouse = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateWarehouse = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteWarehouse = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
