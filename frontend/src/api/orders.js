import axios from 'axios';

const API_URL = '/api/orders';

export const fetchOrders = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createOrder = async (order) => {
  await axios.post(API_URL, order);
};

export const deleteOrder = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
