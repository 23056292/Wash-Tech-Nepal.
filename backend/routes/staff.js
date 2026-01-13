const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Staff = require('../models/Staff');
const User = require('../models/User');

// @route   GET api/staff
// @desc    Get all staff members for current user's company
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let staffMembers;

    if (req.user.role === 'ADMIN') {
      // Admin can see all staff
      staffMembers = await Staff.find()
        .populate('user', ['name', 'email'])
        .populate('company', ['name'])
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'COMPANY') {
      // Company user can see only their staff
      staffMembers = await Staff.find({ company: req.user.company })
        .populate('user', ['name', 'email'])
        .populate('company', ['name'])
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'STAFF') {
      // Staff can see only themselves
      staffMembers = await Staff.find({ user: req.user._id })
        .populate('user', ['name', 'email'])
        .populate('company', ['name']);
    } else {
      return res.status(401).json({ msg: 'Access denied' });
    }

    res.json(staffMembers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;