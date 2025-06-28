require("dotenv").config();
const axios = require('axios');
const Payment = require("../models/paymentModel");
const Collector = require("../models/collector");

const AF_TALKING_USERNAME = process.env.AT_USERNAME;
const AF_TALKING_API_KEY = process.env.AT_API_KEY;
const AF_TALKING_BASE_URL = 'https://api.sandbox.africastalking.com/version1/';

const payHomeowner = async (req, res) => {
  try {
    const { requestId, homeownerId, amount, phoneNumber: rawPhoneNumber, collectorId } = req.body; // Renamed for clarity

    if (!requestId || !homeownerId || !amount || !rawPhoneNumber) {
      console.error("Missing required payment details in request body:", { requestId, homeownerId, amount, rawPhoneNumber });
      return res.status(400).json({ error: 'Missing required payment details (request ID, homeowner ID, amount, phone number).' });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      console.error("Invalid amount provided:", amount);
      return res.status(400).json({ error: 'Invalid amount provided. Must be a positive number.' });
    }

    const formattedAmount = `KES ${parsedAmount.toFixed(2)}`;

    // Ensure phone number is in international format (+254...)
    let phoneNumber = rawPhoneNumber;
    if (phoneNumber.startsWith('0')) {
        phoneNumber = `+254${phoneNumber.substring(1)}`;
    }
    // You might also add more robust checks here, e.g., if it starts with '254' convert to '+254'

    // ***************************************************************
    // IMPORTANT FIX: DO NOT JSON.stringify the 'recipients' array.
    // axios will handle stringifying the whole payload because Content-Type is 'application/json'.
    // ***************************************************************
    const africaTalkingPayload = {
      username: AF_TALKING_USERNAME,
      recipients: [ // <-- Changed from JSON.stringify([]) to direct array []
        {
          phoneNumber: phoneNumber,
          amount: formattedAmount,
        },
      ],
    };

    console.log("Backend sending direct request to Africa's Talking with payload:", africaTalkingPayload);

    const response = await axios.post(
      `${AF_TALKING_BASE_URL}airtime/send`,
      africaTalkingPayload,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          apiKey: AF_TALKING_API_KEY,
        },
      }
    );

    console.log('✅ Airtime sent successfully via Africa\'s Talking:', response.data);

    const airtimeResult = response.data;
    const airtimeResponseDetail = airtimeResult.responses && airtimeResult.responses.length > 0
                                  ? airtimeResult.responses[0]
                                  : null;

    if (airtimeResult.errorMessage || !airtimeResponseDetail || airtimeResponseDetail.status !== 'Success') {
      console.error("Africa's Talking API returned an error or non-success status:", airtimeResult);
      return res.status(400).json({
        message: "Payment failed via Africa's Talking API.",
        error: airtimeResult.errorMessage || (airtimeResponseDetail ? `${airtimeResponseDetail.status}: ${airtimeResponseDetail.errorMessage}` : "Unknown error from Africa's Talking"),
        atResponse: airtimeResult
      });
    }

    const payment = new Payment({
      requestId,
      collectorId: collectorId,
      homeownerId,
      amount: parsedAmount,
      phoneNumber,
      transactionId: airtimeResponseDetail.requestId,
      status: airtimeResponseDetail.status,
      paidAt: new Date()
    });
    await payment.save();

    res.status(200).json({
      message: 'Airtime sent successfully and payment recorded!',
      data: response.data,
      paymentRecord: payment,
    });

  } catch (error) {
    console.error('❌ Payment error in payHomeowner controller:', error.response?.data || error.message);
    res.status(400).json({
      error: 'Airtime payment failed',
      detail: error.response?.data ? JSON.stringify(error.response.data) : error.message,
    });
  }
};

const getHomeownerPayments = async (req, res) => {
    try {
        const homeownerId = req.params.homeownerId;
        const payments = await Payment.find({ homeownerId: homeownerId })
                                     .populate('collectorId', 'fullName phoneNo')
                                     .sort({ paidAt: -1 });
        res.status(200).json({
            message: "Homeowner payments fetched successfully!",
            payments: payments,
            success: true
        });
    } catch (error) {
        console.error("Error fetching homeowner payments:", error);
        res.status(500).json({ message: "Failed to fetch payments", error: error.message });
    }
};

module.exports = {
  payHomeowner,
  getHomeownerPayments,
};