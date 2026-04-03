
const express = require('express');
const {
    getEvents,
    createEvent,
    getMyEvents, // Added this
    updateEvent,
    deleteEvent,
    joinEvent,
    leaveEvent
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Specific routes must come before routes with parameters (:id)
router.get('/my-events', protect, getMyEvents);

router.route('/')
    .get(getEvents)
    .post(protect, createEvent);

router.route('/:id')
    .put(protect, updateEvent)
    .delete(protect, deleteEvent);

router.post('/:id/join', protect, joinEvent);
router.post('/:id/leave', protect, leaveEvent);

module.exports = router;
