const express = require('express');
const user = require('../controller/user');
const { checkToken } = require('../controller/auth');
const router = express.Router();

router.post('/', checkToken, user.addUser);

router.get('/', checkToken, user.getAllUser);

router.get('/:id', checkToken, user.getUserById);

router.put('/:id', checkToken, user.updateUser);

module.exports = router;