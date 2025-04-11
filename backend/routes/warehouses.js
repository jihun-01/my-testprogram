const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔍 창고 목록 조회
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM warehouses');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json(rows);
});

// 📦 특정 창고의 재고 조회
router.get('/:id/inventory', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM inventory WHERE warehouse_id = ?', [req.params.id]);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json(rows);
});

// ➕ 창고 등록
router.post('/', async (req, res) => {
  const { name, location } = req.body;
  await db.query('INSERT INTO warehouses (name, location) VALUES (?, ?)', [name, location]);
  res.sendStatus(201);
});

module.exports = router;
