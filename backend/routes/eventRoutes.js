
const express = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent, joinEvent, leaveEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getEvents).post(protect, createEvent);
router.route('/:id').put(protect, updateEvent).delete(protect, deleteEvent);

router.post('/:id/join', protect, joinEvent);
router.post('/:id/leave', protect, leaveEvent);

module.exports = router;
