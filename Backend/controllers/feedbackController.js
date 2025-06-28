// const Feedback = require('../models/feedbackModel');
// const Request = require('../models/Requests');

// exports.submitFeedback = async (req, res) => {
//   const { requestId, collector, rating, comment, pickupDone } = req.body;

//   try {
//     const existing = await Feedback.findOne({ requestId });
//     if (existing) {
//       return res.status(400).json({ error: 'Feedback already submitted' });
//     }

//     const request = await Request.findById(requestId);
//     if (!request || request.status !== 'completed') {
//       return res.status(400).json({ error: 'Invalid or uncompleted request' });
//     }

//     const feedback = new Feedback({
//       requestId,
//       collector,
//       rating,
//       comment,
//       pickupDone
//     });

//     await feedback.save();

//     res.status(200).json({ message: 'Feedback submitted successfully', feedback });
//   } catch (err) {
//     console.error('Feedback submission error:', err);
//     res.status(500).json({ error: 'Server error while submitting feedback' });
//   }
// };

// exports.getUserCompletedUnreviewedRequest = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const request = await Request.findOne({
//       user: userId,
//       status: 'completed',
//       _id: { $nin: await Feedback.find().distinct('requestId') }
//     }).populate('collector');

//     if (!request) {
//       return res.status(404).json({ message: 'No unreviewed completed requests found' });
//     }

//     res.status(200).json({ request });
//   } catch (err) {
//     console.error('Fetch unreviewed request error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };
// const getFeedbackByCenterId = async (req, res) => {
//   const { centerId } = req.params;

//   try {
//     // First, find all requests that belong to this center
//     const requests = await Request.find({ centerId }).select('_id');
//     const requestIds = requests.map(r => r._id);

//     // Now find feedbacks tied to these requests
//     const feedbacks = await Feedback.find({ requestId: { $in: requestIds } })
//       .populate('homeownerId', 'fullName email')
//       .populate('collectorId', 'fullName email')
//       .populate('requestId');

//     res.status(200).json({ feedbacks });
//   } catch (error) {
//     console.error('Error fetching feedbacks for center:', error);
//     res.status(500).json({ message: 'Server error fetching center feedbacks' });
//   }
// };

// module.exports = {
  
//   getFeedbackByCenterId
// };





const Feedback = require('../models/feedbackModel');
const Request = require('../models/Requests'); // Correctly references the Request model

// Submit feedback
const submitFeedback = async (req, res) => {
  const { requestId, collector, rating, comment, pickupDone } = req.body;

  console.log('Received feedback payload:', req.body);

  try {
    const existing = await Feedback.findOne({ requestId });
    if (existing) {
      console.log('Feedback already exists for request:', requestId);
      return res.status(400).json({ error: 'Feedback already submitted' });
    }

    const request = await Request.findById(requestId);
    console.log('Fetched request:', request);

    if (!request || request.status !== 'collected') {
      return res.status(400).json({ error: 'Invalid or uncollected request' });
    }

    const feedback = new Feedback({
      requestId,
      collector,
      rating,
      comment,
      pickupDone
    });

    await feedback.save();

    console.log('Feedback saved successfully:', feedback);
    res.status(200).json({ message: 'Feedback submitted successfully', feedback });
  } catch (err) {
    console.error('Feedback submission error:', err);
    res.status(500).json({ error: 'Server error while submitting feedback' });
  }
};

// Get a user's completed (collected) and unreviewed request
const getUserCompletedUnreviewedRequest = async (req, res) => {
  const { userId } = req.params;

  try {
    const reviewedIds = await Feedback.find().distinct('requestId');
    console.log('Reviewed Request IDs:', reviewedIds);

    const request = await Request.findOne({
      homeownerId: userId, // Corrected field name from previous fix
      status: 'collected',
      _id: { $nin: reviewedIds }
    })
    // --- FIX START ---
    // Change 'collector' to 'collectorId' to match the Request model schema
    .populate('collectorId'); 
    // --- FIX END ---

    console.log('Unreviewed request found:', request);

    if (!request) {
      return res.status(404).json({ message: 'No unreviewed collected requests found' });
    }

    res.status(200).json({ request });
  } catch (err) {
    console.error('Fetch unreviewed request error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get feedbacks for a center
const getFeedbackByCenterId = async (req, res) => {
  const { centerId } = req.params;

  try {
    // Assuming 'collectionCenter' in Request model links to 'Center'
    const requests = await Request.find({ collectionCenter: centerId }).select('_id');
    const requestIds = requests.map(r => r._id);

    console.log('Center Request IDs:', requestIds);

    const feedbacks = await Feedback.find({ requestId: { $in: requestIds } })
      .populate({
          path: 'requestId',
          populate: {
              path: 'homeownerId', // Populate homeowner details from the Request
              select: 'fullName email'
          }
      })
      .populate({
          path: 'collector', // This one is correctly on Feedback model
          select: 'fullName email'
      });

    console.log('Feedbacks found:', feedbacks.length);
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error('Error fetching feedbacks for center:', error);
    res.status(500).json({ message: 'Server error fetching center feedbacks' });
  }
};

module.exports = {
  submitFeedback,
  getUserCompletedUnreviewedRequest,
  getFeedbackByCenterId
};
