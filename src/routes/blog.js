const express = require('express');
const { getAllBlogsHandler, createPostHandler } = require('../controllers/blog');

const router = express.Router();

router.get('/', getAllBlogsHandler);
// router.post('/', createPostHandler);

module.exports = router;
