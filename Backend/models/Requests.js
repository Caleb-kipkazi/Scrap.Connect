const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  homeownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  pickupDate: {
    type: String,
    required: true
  },
  pickupTime: {
    type: String,
    required: true
  },
  scrapType: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  weight: {
    type: Number,
    required: true
  },
  collectionCenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: true
  },
  imageUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'collected'],
    default: 'pending'
  },
  collectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collector',
    default: null
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  approvedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Request', requestSchema);
