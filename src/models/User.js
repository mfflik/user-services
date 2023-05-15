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
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Gagal menambahkan pengguna baru:', error);
    throw error;
  }
}

module.exports = {
  getUsers,
  addUser
};