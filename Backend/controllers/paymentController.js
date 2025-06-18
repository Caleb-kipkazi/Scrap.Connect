const Payment = require('../models/paymentModel');
const Request = require('../models/requestModel');

const createPayment = async (req, res) => {
  try {
    const { requestId, homeownerId, amount, phoneNumber } = req.body;
    const collectorId = req.user.id; // decoded from token

    // Optional: Check if request belongs to this collector
    const request = await Request.findById(requestId);
    if (!request || request.collectorId.toString() !== collectorId) {
      return res.status(403).json({ message: 'Unauthorized or invalid request' });
    }

    // Save payment
    const payment = new Payment({
      requestId,
      collectorId,
      homeownerId,
      amount,
      phoneNumber
    });

    await payment.save();
    res.status(201).json({ message: 'Payment recorded successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};

module.exports = { createPayment };
