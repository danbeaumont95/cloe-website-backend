const express = require('express');
const { getAllPapersHandler } = require('../controllers/papers');

const router = express.Router();

router.get('/', getAllPapersHandler);

module.exports = router;
