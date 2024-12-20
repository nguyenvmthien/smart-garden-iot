require('dotenv').config(); // Tải các biến môi trường từ file .env

const { Pool } = require('pg');

// Tạo kết nối đến cơ sở dữ liệu PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }, // Yêu cầu SSL trên Clever Cloud
});

pool.on('connect', () => {
  console.log('Kết nối thành công đến PostgreSQL!');
});

module.exports = pool;
