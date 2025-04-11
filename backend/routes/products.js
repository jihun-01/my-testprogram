const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔍 상품 목록 조회 (검색 포함)
router.get('/', async (req, res) => {
  const keyword = req.query.keyword || '';
  const [rows] = await db.query(
    'SELECT * FROM products WHERE name LIKE ? ORDER BY id DESC',
    [`%${keyword}%`]
  );
  res.json(rows);
});

// ➕ 상품 등록
router.post('/', async (req, res) => {
  const { name, sku, price, stock, location } = req.body;
  await db.query(
    'INSERT INTO products (name, sku, price, stock, location) VALUES (?, ?, ?, ?, ?)',
    [name, sku, price, stock, location]
  );
  res.sendStatus(201);
});

// 🛠️ 상품 수정
router.put('/:id', async (req, res) => {
  const { name, sku, price, stock, location } = req.body;
  await db.query(
    'UPDATE products SET name = ?, sku = ?, price = ?, stock = ?, location = ? WHERE id = ?',
    [name, sku, price, stock, location, req.params.id]
  );
  res.sendStatus(200);
});

// ❌ 상품 삭제
router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
  res.sendStatus(204);
});

module.exports = router;
