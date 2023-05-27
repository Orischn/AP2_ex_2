const express = require('express');
const { checkToken } = require('../controllers/token.js')
const { addUser, recieveUser } = require('../controllers/users.js');
const router = express.Router();

router.post('/api/Users', addUser);
router.get('/api/Users/:username', checkToken, recieveUser);
module.exports = router;