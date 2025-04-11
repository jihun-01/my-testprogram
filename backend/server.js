const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

// 미들웨어
app.use(express.json()); // JSON 요청 파싱
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3001']
}));


// 라우트 등록
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/warehouses', require('./routes/warehouses'));


app.use(express.static(path.join(__dirname, '../logistics-frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../logistics-frontend/build', 'index.html'));
});
// 서버 시작
app.listen(3000, () => console.log('🚀 Backend running on http://localhost:3000'));
