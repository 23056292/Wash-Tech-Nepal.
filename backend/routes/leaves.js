const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Leave = require('../models/Leave');
const Staff = require('../models/Staff');

// @route   GET api/leaves
// @desc    Get leave requests
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let leaves;

    if (req.user.role === 'ADMIN') {
      // Admin can see all leaves
      leaves = await Leave.find()
        .populate('staff', ['user'])
        .populate('staff.user', ['name', 'email'])
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'COMPANY') {
      // Company user can see leaves for their staff
      leaves = await Leave.find({
        'staff.company': req.user.company
      })
        .populate('staff', ['user'])
        .populate('staff.user', ['name', 'email'])
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'STAFF') {
      // Staff can see their own leaves
      const staff = await Staff.findOne({ user: req.user._id });
      if (!staff) {
        return res.status(404).json({ msg: 'Staff member not found' });
      }
      
      leaves = await Leave.find({ staff: staff._id })
        .sort({ createdAt: -1 });
    } else {
      return res.status(401).json({ msg: 'Access denied' });
    }

    res.json(leaves);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;