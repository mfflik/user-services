// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail, saveSession } = require('../models/authModel');
const { JWT_SECRET } = require('../services/jwtConfig')

// Fungsi untuk melakukan login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Ambil data pengguna dari database berdasarkan email
        const user = await getUserByEmail(email);
        console.log(email)
        console.log(password)
        // Jika pengguna tidak ditemukan atau password tidak cocok, kirim respons error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Buat token akses
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        // Simpan session ke dalam database
        await saveSession(user.id, token);

        // Kirim token sebagai respons
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = { login };