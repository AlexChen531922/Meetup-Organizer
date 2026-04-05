// backend/routes/userRoutes.js
const express = require('express');
const { getUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route: GET /api/users
router.get('/', protect, getUsers);

module.exports = router;