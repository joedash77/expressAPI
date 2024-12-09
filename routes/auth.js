const auth = require('../controller/auth');
const express = require('express');
const router = express.Router();

module.exports.login = router.post('', auth.login);