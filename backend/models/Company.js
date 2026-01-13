const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  staffCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  settings: {
    workStartTime: {
      type: String,
      default: '09:00'
    },
    workEndTime: {
      type: String,
      default: '17:00'
    },
    breakDuration: {
      type: Number,
      default: 60 // in minutes
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Company', companySchema);