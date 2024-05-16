
const express = require('express');
const router = express.Router();
const UserController = require('../controller/user'); // Import your user controller

// Define routes for user signup and login
router.post('/signup', UserController.signup); // Use the signup function from your controller
router.post('/login', UserController.login); // Use the login function from your controller

module.exports = router;
