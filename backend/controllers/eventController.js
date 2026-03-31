const Event = require('../models/Event');

// Get all events (UserStory 2: Browse)
const getEvents = async (req, res) => {
    try {
        // populate get host and attendees name for front end
        const events = await Event.find().populate('hostId', 'name').populate('attendees', 'name');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create event (UserStory 1: Create)
const createEvent = async (req, res) => {
    try {
        const newEventData = { ...req.body, hostId: req.user.id };
        const event = await Event.create(newEventData);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update event (UserStory 4, 6: Update)
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // check permissions: only host or admin can modify
        if (event.hostId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized to update' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete event (UserStory 4, 6: Delete)
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.hostId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized to delete' });
        }

        await event.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Join event (UserStory 3: Attend)
const joinEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // check if already joined
        if (event.attendees.includes(req.user.id)) {
            return res.status(400).json({ message: 'You have already joined this event' });
        }

        // check attendee limit
        if (event.attendeeLimit > 0 && event.attendees.length >= event.attendeeLimit) {
            return res.status(400).json({ message: 'Event is full' });
        }

        event.attendees.push(req.user.id);
        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cancel attending event (UserStory 3: Cancel Attendance)
const leaveEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        event.attendees = event.attendees.filter(userId => userId.toString() !== req.user.id);
        await event.save();
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent, joinEvent, leaveEvent };