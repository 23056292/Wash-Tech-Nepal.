const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Attendance = require('../models/Attendance');
const Staff = require('../models/Staff');

// @route   GET api/attendance
// @desc    Get attendance records for current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let attendanceRecords;

    if (req.user.role === 'ADMIN') {
      // Admin can see all attendance
      attendanceRecords = await Attendance.find()
        .populate('staff', ['user'])
        .populate('staff.user', ['name', 'email'])
        .sort({ date: -1 });
    } else if (req.user.role === 'COMPANY') {
      // Company user can see attendance for their staff
      attendanceRecords = await Attendance.find({
        'staff.company': req.user.company
      })
        .populate('staff', ['user'])
        .populate('staff.user', ['name', 'email'])
        .sort({ date: -1 });
    } else if (req.user.role === 'STAFF') {
      // Staff can see their own attendance
      const staff = await Staff.findOne({ user: req.user._id });
      if (!staff) {
        return res.status(404).json({ msg: 'Staff member not found' });
      }
      
      attendanceRecords = await Attendance.find({ staff: staff._id })
        .sort({ date: -1 });
    } else {
      return res.status(401).json({ msg: 'Access denied' });
    }

    res.json(attendanceRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST api/attendance/checkin
// @desc    Staff check-in
// @access  Private
router.post('/checkin', auth, async (req, res) => {
  try {
    // Find staff by user ID
    const staff = await Staff.findOne({ user: req.user._id });
    if (!staff) {
      return res.status(404).json({ msg: 'Staff member not found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for comparison

    // Check if already checked in today
    const existingAttendance = await Attendance.findOne({
      staff: staff._id,
      date: {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lt: new Date(today.setHours(23, 59, 59, 999))
      }
    });

    if (existingAttendance && existingAttendance.checkInTime) {
      return res.status(400).json({ msg: 'Already checked in today' });
    }

    let attendance;
    if (existingAttendance) {
      // Update existing record
      attendance = await Attendance.findOneAndUpdate(
        { _id: existingAttendance._id },
        { 
          checkInTime: new Date(),
          status: 'PRESENT'
        },
        { new: true }
      );
    } else {
      // Create new attendance record
      attendance = new Attendance({
        staff: staff._id,
        date: new Date(),
        checkInTime: new Date(),
        status: 'PRESENT'
      });
      await attendance.save();
    }

    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST api/attendance/checkout
// @desc    Staff check-out
// @access  Private
router.post('/checkout', auth, async (req, res) => {
  try {
    // Find staff by user ID
    const staff = await Staff.findOne({ user: req.user._id });
    if (!staff) {
      return res.status(404).json({ msg: 'Staff member not found' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for comparison

    // Find today's attendance record
    const attendance = await Attendance.findOne({
      staff: staff._id,
      date: {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lt: new Date(today.setHours(23, 59, 59, 999))
      }
    });

    if (!attendance) {
      return res.status(400).json({ msg: 'No check-in record found for today' });
    }

    if (attendance.checkOutTime) {
      return res.status(400).json({ msg: 'Already checked out today' });
    }

    // Calculate total hours
    const checkInTime = attendance.checkInTime;
    const checkOutTime = new Date();
    const totalHours = Math.round(((checkOutTime - checkInTime) / (1000 * 60 * 60)) * 100) / 100;

    // Update check-out time and total hours
    const updatedAttendance = await Attendance.findOneAndUpdate(
      { _id: attendance._id },
      { 
        checkOutTime: checkOutTime,
        totalHours: totalHours
      },
      { new: true }
    );

    res.json(updatedAttendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;