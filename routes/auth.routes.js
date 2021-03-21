const express = require('express');
const router = express.Router();
const { register, signin, loadUserFromToken } = require('../controllers/auth.controller');

// @route POST api/auth Create a new User
router.post('/register', register);

// @route POST api/auth sign in
router.post('/signin', signin);

// @route GET api/auth load-loged-user
router.get('/load-user-from-token', loadUserFromToken);


module.exports = router;