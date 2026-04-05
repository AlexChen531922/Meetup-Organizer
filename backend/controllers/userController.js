// backend/controllers/userController.js
const User = require('../models/User');

// Fetch all users for Admin Dashboard
const getUsers = async (req, res) => {
    try {
        // Find all users and exclude their passwords for security
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });

        // Format data to perfectly match the frontend Admin.jsx expectations
        const formattedUsers = users.map(u => ({
            _id: u._id,
            name: u.name,
            email: u.email,
            role: u.role || 'participant',
            bio: u.bio || 'Member of MeetHub community',
            joined: u.createdAt
                ? new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'Unknown Date'
        }));

        res.status(200).json(formattedUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

module.exports = {
    getUsers
};