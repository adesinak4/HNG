const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

// Retrieve a user by ID
router.get('/:user_id', userController.fetchUser);

// Update a user by ID
router.put('/:user_id', userController.updateUser);

// Delete a user by ID
router.delete('/:user_id', userController.deleteUser);

module.exports = router;
