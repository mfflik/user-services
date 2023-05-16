//UserModel.js
const pool = require('../services/dbConfig');

async function getUsers() {
  try {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Gagal mengambil daftar pengguna:', error);
    throw error;
  }
}

async function addUser(username, email, password, role) {
  try {
    const query = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [username, email, password, role];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Gagal menambahkan pengguna baru:', error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [userId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error('Gagal menambahkan pengguna baru:', error);
    throw error;
  }
}

async function getUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const { rows } = await pool.query(query, values);
  return rows[0];
}


async function getUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const { rows } = await pool.query(query, values);
  return rows.length > 0;
}

module.exports = {
  getUsers,
  addUser,
  getUserById,
  getUserByEmail,
  getUserByUsername
};