// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../services/jwtConfig')

// Middleware untuk memeriksa token akses
const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    // Verifikasi token akses
    const decoded = jwt.verify(token, JWT_SECRET);

    // Menyimpan informasi user pada objek request
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { checkAuth };