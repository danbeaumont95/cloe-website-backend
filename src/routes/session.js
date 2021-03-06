const express = require('express');
const { createSessionHandler } = require('../controllers/session');
const { validateRequest } = require('../middleware/validateRequest');
const { createUserSessionSchema } = require('../schema/user');

const router = express.Router();

router.post('/', validateRequest(createUserSessionSchema), createSessionHandler);

module.exports = router;
