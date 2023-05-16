//src/index.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Handler untuk rute yang tidak ditemukan
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

// Port server
const PORT = process.env.PORT || 3000;

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});