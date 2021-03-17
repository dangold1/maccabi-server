const express = require('express');
const router = express.Router();
const { register, signin } = require('../controllers/auth.controller');

// @route POST api/auth Create a new User
router.post('/register', register);

// @route POST api/auth sign in
router.post('/signin', signin);


module.exports = router;