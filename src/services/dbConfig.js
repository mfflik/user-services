const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin', // Ganti dengan username PostgreSQL Anda
  host: 'localhost', // Ganti dengan host PostgreSQL Anda
  database: 'user_services', // Ganti dengan nama database PostgreSQL Anda
  password: '12345678', // Ganti dengan password PostgreSQL Anda
  port: 5432 // Ganti dengan port PostgreSQL Anda
});

module.exports = pool;