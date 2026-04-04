const express = require('express');
const {
    getEvents,
    createEvent,
    getHostedEvents,
    getAttendedEvents,
    updateEvent,
    deleteEvent,
    joinEvent,
    leaveEvent,
    getEventById
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/hosted', protect, getHostedEvents);
router.get('/attended', protect, getAttendedEvents);

router.route('/')
    .get(getEvents)
    .post(protect, createEvent);

router.route('/:id')
    .get(getEventById)
    .put(protect, updateEvent)
    .delete(protect, deleteEvent);

router.post('/:id/join', protect, joinEvent);
router.post('/:id/leave', protect, leaveEvent);

module.exports = router;
