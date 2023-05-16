import { find, create } from '../models/userModel';

async function getUsers() {
  try {
    const users = await find();
    return users;
  } catch (error) {
    console.error('Gagal mengambil daftar pengguna:', error);
    throw error;
  }
}

async function addUser(username, email, password, role) {
  try {
    const newUser = await create({ username, email, password, role });
    return newUser;
  } catch (error) {
    console.error('Gagal menambahkan pengguna baru:', error);
    throw error;
  }
}

export default {
  getUsers,
  addUser,
};