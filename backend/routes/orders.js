const express = require('express');
const router = express.Router();
const db = require('../db');

// 주문 전체 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM orders ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('GET /orders error:', err);
    res.status(500).json({ error: '주문 조회 실패' });
  }
});

// 주문 등록
router.post('/', async (req, res) => {
  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) {
    return res.status(400).json({ error: '필수 항목 누락' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO orders (product_id, quantity) VALUES (?, ?)',
      [product_id, quantity]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('POST /orders error:', err);
    res.status(500).json({ error: '주문 등록 실패' });
  }
});

// 주문 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM orders WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    console.error('DELETE /orders error:', err);
    res.status(500).json({ error: '주문 삭제 실패' });
  }
});

module.exports = router;
