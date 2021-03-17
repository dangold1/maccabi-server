const express = require('express');
const router = express.Router();
const { exportsUsers } = require('../controllers/info.controller');

// @route GET api/info Export all users data
router.get('/all-users', exportsUsers);


module.exports = router;