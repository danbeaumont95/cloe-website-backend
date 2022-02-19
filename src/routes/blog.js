const express = require('express');
const { getAllBlogsHandler, createBlogHandler } = require('../controllers/blog');

const router = express.Router();

router.get('/', getAllBlogsHandler);
router.post('/', createBlogHandler);

module.exports = router;
