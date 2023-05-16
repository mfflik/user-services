const userModel = require('../models/userModel');
const passwordUtils = require('../utils/passwordUtils');

async function checkDuplicateEmail(email) {
    const user = await userModel.getUserByEmail(email);
    if (user) {
        throw new Error('Email sudah digunakan');
    }
}

async function checkDuplicateUsername(username) {
    const user = await userModel.getUserByUsername(username);
    if (user) {
        throw new Error('Username sudah digunakan');
    }
}

async function getUsers(req, res) {
    try {
        const users = await userModel.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Gagal mengambil daftar pengguna:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}

async function getUserById(req, res) {
    try {
        const userId = req.params.id;
        const user = await userModel.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Gagal mengambil data pengguna:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}


async function addUser(req, res) {
    try {
        const { username, email, password, role } = req.body;

        // Check duplicate email
        await checkDuplicateEmail(email);

        // Check duplicate username
        await checkDuplicateUsername(username);

        // Hash password
        const hashedPassword = await passwordUtils.hashPassword(password);

        // Add user
        const newUser = await userModel.addUser(username, email, hashedPassword, role);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.message === 'Email sudah digunakan') {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }
        if (error.message === 'Username sudah digunakan') {
            return res.status(400).json({ message: 'Username sudah digunakan' });
        }
        console.error('Gagal menambahkan pengguna baru:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}

module.exports = {
    getUsers,
    addUser,
    getUserById
};