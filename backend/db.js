const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',     // mysql
  user: process.env.DB_USER || 'root',          // user
  password: process.env.DB_PASSWORD || '',      // 1234
  database: process.env.DB_NAME || 'logistics',  // logistics
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // 👇 아래 옵션 강제 설정
  namedPlaceholders: true,
  supportBigNumbers: true,
  bigNumberStrings: true,
  dateStrings: true,
  connectTimeout: 10000,
  // 이 부분 중요
  typeCast: true,












});
pool.getConnection((err, connection) => {
  if (err) throw err;
  connection.query("SET NAMES utf8mb4", () => {
    connection.release();
  });
});
module.exports = pool.promise();