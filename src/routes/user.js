const express = require('express');
const { createUserHandler } = require('../controllers/user');
const router = express.Router();

router.post('/', createUserHandler);

module.exports = router;
