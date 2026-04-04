// backend/controllers/groupController.js
const Group = require('../models/Group');

exports.getGroups = async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};

        // search
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // Filter
        if (category && category !== 'All Categories') {
            query.category = category;
        }

        const groups = await Group.find(query).sort({ createdAt: -1 });
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};