const express = require('express');

const router = express.Router();

// Load User controller
const { registerUser, loginUser, getUserInfo } = require('../../controllers/users');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', registerUser);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', loginUser);

// @route GET api/users/account
// @desc get user information (name, transcripts)
// @access Private
router.get('/account', getUserInfo);

module.exports = router;
