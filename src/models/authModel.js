// models/authModel.js

const pool = require('../services/dbConfig');

// Fungsi untuk mendapatkan pengguna berdasarkan email
const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

// Fungsi untuk menyimpan session ke dalam database
const saveSession = async (userId, token) => {
    await pool.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2)', [userId, token]);
};

module.exports = { getUserByEmail, saveSession };