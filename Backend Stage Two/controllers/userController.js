const { validationResult, body } = require('express-validator');
const User = require('../models/user');

// Create a new User
exports.createUser = [
    body('name').trim().isLength({ min: 1 }).escape(),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Unable to create a user.' });
        }
    },
];

// Retrieve a User by user_id
exports.fetchUser = async (req, res) => {
    try {
        const user = await User.findOne({ user_id: req.params.user_id });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Unable to retrieve the user.' });
    }
};

// Update a User by user_id
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ user_id: req.params.user_id }, req.body, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Unable to update the user.' });
    }
};

// Delete a User by user_id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ user_id: req.params.user_id });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete the user.' });
    }
};