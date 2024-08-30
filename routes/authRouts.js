const express = require('express');
const router = express.Router();
const { createUser, validateUser } = require('../controller/userCtrl');

// User creation route
router.post('/register', validateUser, createUser);

module.exports = router;
