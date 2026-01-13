const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Company = require('../models/Company');
const Staff = require('../models/Staff');
const Attendance = require('../models/Attendance');

// @route   GET api/stats
// @desc    Get dashboard stats
// @access  Private (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    // Only allow admin users
    if (req.user.role !== 'ADMIN') {
      return res.status(401).json({ msg: 'Access denied' });
    }

    // Get stats
    const totalCompanies = await Company.countDocuments();
    const totalStaff = await Staff.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    // Count staff who checked in today
    const activeStaffToday = await Attendance.countDocuments({
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // End of today
      },
      status: 'PRESENT'
    });
    
    const totalCheckIns = await Attendance.countDocuments({
      checkInTime: { $exists: true, $ne: null }
    });

    res.json({
      totalCompanies,
      totalStaff,
      activeStaffToday,
      totalCheckIns
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;