const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Endpoint: GET /users
router.get('/', userController.getUsers);

// Endpoint: GET /users/:id
router.get('/:id', userController.getUserById);

// Endpoint: POST /users
router.post('/', userController.addUser);



module.exports = router;