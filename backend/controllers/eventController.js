const Event = require('../models/Event');

// Fetch events created by the logged-in user (Host Dashboard)
const getMyEvents = async (req, res) => {
    try {
        // Find events where hostId matches the current user's ID
        const events = await Event.find({ hostId: req.user._id })
            .populate('hostId', 'name')
            .populate('attendees', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all events (UserStory 2: Browse)
const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('hostId', 'name')
            .populate('attendees', 'name')
            .sort({ date: 1 }); // Sort by upcoming date
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create event (UserStory 1: Create)
const createEvent = async (req, res) => {
    try {
        const eventData = { ...req.body };

        // Bind the current user's ID as the hostId
        eventData.hostId = req.user._id;

        const newEvent = new Event(eventData);
        const savedEvent = await newEvent.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: "Failed to create event", error: error.message });
    }
};

// Update event (UserStory 4, 6: Update)
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Check permissions: only host or admin can modify
        if (event.hostId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
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

        // Check permissions: only host or admin can modify
        if (event.hostId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized to delete' });
        }

        await event.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get single event by ID (Added for Event Details Page)
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('hostId', 'name email')
            .populate('attendees', 'name');

        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Join event (UserStory 3: Attend)
const joinEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Check if already joined
        if (event.attendees.includes(req.user._id)) {
            return res.status(400).json({ message: 'You have already joined this event' });
        }

        // Check attendee limit
        if (event.attendeeLimit > 0 && event.attendees.length >= event.attendeeLimit) {
            return res.status(400).json({ message: 'Event is full' });
        }

        event.attendees.push(req.user._id);
        await event.save();

        // 🌟 CRITICAL FIX: Populate before sending back to frontend to avoid React crash
        await event.populate('hostId', 'name');
        await event.populate('attendees', 'name');

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

        event.attendees = event.attendees.filter(userId => userId.toString() !== req.user._id.toString());
        await event.save();

        // 🌟 CRITICAL FIX: Populate again
        await event.populate('hostId', 'name');
        await event.populate('attendees', 'name');

        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getMyEvents = async (req, res) => {
    try {
        const userId = req.user._id;

        const myEvents = await Event.find({ attendees: userId }).sort({ date: 1 });

        res.status(200).json(myEvents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your events', error: error.message });
    }
};

module.exports = {
    getEvents,
    createEvent,
    getMyEvents,
    updateEvent,
    deleteEvent,
    joinEvent,
    leaveEvent,
    getEventById
};