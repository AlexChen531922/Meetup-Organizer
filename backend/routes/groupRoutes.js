// backend/routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const { getGroups } = require('../controllers/groupController');

router.get('/', getGroups);

module.exports = router;