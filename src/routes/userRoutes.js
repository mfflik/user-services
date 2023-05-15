const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Endpoint: GET /users
router.get('/', userController.getUsers);

// Endpoint: POST /users
router.post('/', userController.addUser);

module.exports = router;