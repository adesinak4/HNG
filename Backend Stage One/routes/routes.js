const express = require('express');
const Controller = require('../controllers/Controller');

const router = express.Router();

// Define the route and link it to the controller
router.get('/', Controller.getData);

module.exports = router;
