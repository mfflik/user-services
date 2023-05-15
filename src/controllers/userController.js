const userModel = require('../models/User');

async function getUsers(req, res) {
    try {
        const users = await userModel.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Gagal mengambil daftar pengguna:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}

async function addUser(req, res) {
    console.log(req.body)
    try {
        const { username, email, password, role } = req.body;
        const newUser = await userModel.addUser(username, email, password, role);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Gagal menambahkan pengguna baru:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}

module.exports = {
    getUsers,
    addUser
};