const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Requests',
    required: true,
    unique: true
  },
  collector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collector',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String
  },
  pickupDone: {
    type: Boolean,
    default: false
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
