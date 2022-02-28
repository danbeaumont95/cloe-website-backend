const express = require('express');
const { getAllS3PapersHandler, postPapersHandler, getAllPapersHandler } = require('../controllers/papers');

const router = express.Router();

router.get('/', getAllPapersHandler);
router.post('/', postPapersHandler);
router.get('/S3Papers', getAllS3PapersHandler);

module.exports = router;
