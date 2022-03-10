const express = require('express');
const { sendEmailToCloeHandler } = require('../controllers/contact');

const router = express.Router();

router.post('/', sendEmailToCloeHandler);

module.exports = router;
