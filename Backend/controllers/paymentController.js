//Working code



// require("dotenv").config();
// const axios = require('axios');
// const Payment = require("../models/paymentModel");
// const AfricasTalking = require("africastalking");
// const Collector = require("../models/collector");

// const AF_TALKING_USERNAME = process.env.AT_USERNAME;
// const AF_TALKING_API_KEY = process.env.AT_API_KEY;
// const AF_TALKING_BASE_URL = 'https://api.sandbox.africastalking.com/version1/';

// const payHomeowner = async (req, res) => {
//   try {
//     const { requestId, homeownerId, amount, phoneNumber: rawPhoneNumber, collectorId } = req.body; // Renamed for clarity

//     if (!requestId || !homeownerId || !amount || !rawPhoneNumber) {
//       console.error("Missing required payment details in request body:", { requestId, homeownerId, amount, rawPhoneNumber });
//       return res.status(400).json({ error: 'Missing required payment details (request ID, homeowner ID, amount, phone number).' });
//     }

//     const parsedAmount = parseFloat(amount);
//     if (isNaN(parsedAmount) || parsedAmount <= 0) {
//       console.error("Invalid amount provided:", amount);
//       return res.status(400).json({ error: 'Invalid amount provided. Must be a positive number.' });
//     }

//     const formattedAmount = `KES ${parsedAmount.toFixed(2)}`;

//     // Ensure phone number is in international format (+254...)
//     let phoneNumber = rawPhoneNumber;
//     if (phoneNumber.startsWith('0')) {
//         phoneNumber = `+254${phoneNumber.substring(1)}`;
//     }
//     // You might also add more robust checks here, e.g., if it starts with '254' convert to '+254'

//     // ***************************************************************
//     // IMPORTANT FIX: DO NOT JSON.stringify the 'recipients' array.
//     // axios will handle stringifying the whole payload because Content-Type is 'application/json'.
//     // ***************************************************************
//     const africaTalkingPayload = {
//       username: AF_TALKING_USERNAME,
//       recipients: [ // <-- Changed from JSON.stringify([]) to direct array []
//         {
//           phoneNumber: phoneNumber,
//           amount: formattedAmount,
//         },
//       ],
//     };

//     console.log("Backend sending direct request to Africa's Talking with payload:", africaTalkingPayload);

//     const response = await axios.post(
//       `${AF_TALKING_BASE_URL}airtime/send`,
//       africaTalkingPayload,
//       {
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           apiKey: AF_TALKING_API_KEY,
//         },
//       }
//     );

//     console.log('✅ Airtime sent successfully via Africa\'s Talking:', response.data);

//     const airtimeResult = response.data;
//     const airtimeResponseDetail = airtimeResult.responses && airtimeResult.responses.length > 0
//                                   ? airtimeResult.responses[0]
//                                   : null;

//     if (airtimeResult.errorMessage || !airtimeResponseDetail || airtimeResponseDetail.status !== 'Success') {
//       console.error("Africa's Talking API returned an error or non-success status:", airtimeResult);
//       return res.status(400).json({
//         message: "Payment Successful.",
//         error: airtimeResult.errorMessage || (airtimeResponseDetail ? `${airtimeResponseDetail.status}: ${airtimeResponseDetail.errorMessage}` : "Unknown error from Africa's Talking"),
//         atResponse: airtimeResult
//       });
//     }

//     const payment = new Payment({
//       requestId,
//       collectorId: collectorId,
//       homeownerId,
//       amount: parsedAmount,
//       phoneNumber,
//       transactionId: airtimeResponseDetail.requestId,
//       status: airtimeResponseDetail.status,
//       paidAt: new Date()
//     });
//     await payment.save();

//     res.status(200).json({
//       message: 'Payment sent successfully and payment recorded!',
//       data: response.data,
//       paymentRecord: payment,
//     });

//   } catch (error) {
//     console.error('❌ Payment error in payHomeowner controller:', error.response?.data || error.message);
//     res.status(400).json({
//       error: 'Payment Successful',
//       detail: error.response?.data ? JSON.stringify(error.response.data) : error.message,
//     });
//   }
// };

// const getHomeownerPayments = async (req, res) => {
//     try {
//         const homeownerId = req.params.homeownerId;
//         const payments = await Payment.find({ homeownerId: homeownerId })
//                                      .populate('collectorId', 'fullName phoneNo')
//                                      .sort({ paidAt: -1 });
//         res.status(200).json({
//             message: "Homeowner payments fetched successfully!",
//             payments: payments,
//             success: true
//         });
//     } catch (error) {
//         console.error("Error fetching homeowner payments:", error);
//         res.status(500).json({ message: "Failed to fetch payments", error: error.message });
//     }
// };

// module.exports = {
//   payHomeowner,
//   getHomeownerPayments,
// };



//test for push
// require("dotenv").config();
// const AfricasTalking = require("africastalking");
// const Payment = require("../models/paymentModel");
// // const Request = require("../models/requestModel"); // uncomment if you enforce ownership

// const at = AfricasTalking({
//   username: process.env.AT_USERNAME,
//   apiKey: process.env.AT_API_KEY,
// });

// async function payHomeowner(req, res) {
//   try {
//     const { requestId, homeownerId, amount, phoneNumber } = req.body;
//     // Better: get collectorId from auth middleware (e.g. req.user.collectorId)
//     const collectorId = req.user?.collectorId || req.body.collectorId;

//     // Optional ownership check:
//     // const request = await Request.findById(requestId);
//     // if (!request || request.collectorId.toString() !== collectorId) {
//     //   return res.status(403).json({ message: "Unauthorized or invalid request" });
//     // }

//     // Send airtime via Africa's Talking
//     const result = await at.AIRTIME.send({
//       recipients: [{
//         phoneNumber,
//         currencyCode: "KES",
//         amount: amount.toString(),
//       }],
//     });
//     const airtimeResponse = result.responses[0];

//     // Save record
//     const payment = new Payment({
//       requestId,
//       collectorId,
//       homeownerId,
//       amount,
//       phoneNumber,
//       transactionId: airtimeResponse.requestId,
//       status: airtimeResponse.status,
//     });
//     await payment.save();

//     return res.status(201).json({
//       message: "Payment recorded and airtime sent",
//       payment,
//       airtime: airtimeResponse,
//     });
//   } catch (error) {
//     console.error("Payment error:", error);
//     return res.status(500).json({ message: "Payment failed", error: error.message });
//   }
// }

// module.exports = { payHomeowner };




//test
// paymentController.js - Corrected for 'Sent' status

// paymentController.js - Modified to always save payment record

require("dotenv").config();
const axios = require('axios');
const Payment = require("../models/paymentModel");
const AfricasTalking = require("africastalking");
const Collector = require("../models/collector");

// Initialize Africa's Talking SDK once globally
const at = AfricasTalking({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_API_KEY,
});

const payHomeowner = async (req, res) => {
  let airtimeResponseDetail = null; // Initialize to null
  let paymentStatusToSave = 'Pending'; // Default status for DB
  let transactionIdToSave = 'N/A'; // Default transaction ID

  try {
    const { requestId, homeownerId, amount, phoneNumber: rawPhoneNumber } = req.body;
    const collectorId = req.user?.collectorId || req.body.collectorId;

    if (!requestId || !homeownerId || !amount || !rawPhoneNumber || !collectorId) {
      console.error("Missing required payment details in request body:", { requestId, homeownerId, amount, rawPhoneNumber, collectorId });
      return res.status(400).json({ error: 'Missing required payment details (request ID, homeowner ID, amount, phone number, collector ID).' });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      console.error("Invalid amount provided:", amount);
      return res.status(400).json({ error: 'Invalid amount provided. Must be a positive number.' });
    }

    // The currency code should be extracted or assumed (e.g., 'KES')
    // and the numeric amount should be used for the SDK.
    const currencyCode = 'KES'; // Assuming KES as the currency based on previous 'KES 50.00' format

    let phoneNumber = rawPhoneNumber;
    if (phoneNumber.startsWith('0')) {
      phoneNumber = `+254${phoneNumber.substring(1)}`;
    } else if (phoneNumber.startsWith('254') && !phoneNumber.startsWith('+254')) {
      phoneNumber = `+${phoneNumber}`;
    }

    // Prepare recipients array for Africa's Talking SDK with separate currencyCode and amount
    const recipients = [
      {
        phoneNumber: phoneNumber,
        currencyCode: currencyCode, // Added currencyCode
        amount: parsedAmount,      // Changed to the parsed numeric amount
      },
    ];

    console.log("Backend sending request to Africa's Talking via SDK with recipients:", recipients);

    const response = await at.AIRTIME.send({
      recipients: recipients,
    });

    console.log('✅ Payment sent successfully via Africa\'s Talking SDK:', response);

    const airtimeResult = response;
    airtimeResponseDetail = airtimeResult.responses && airtimeResult.responses.length > 0
      ? airtimeResult.responses[0]
      : null;

    if (airtimeResponseDetail) {
      paymentStatusToSave = airtimeResponseDetail.status;
      transactionIdToSave = airtimeResponseDetail.requestId;
    } else {
      paymentStatusToSave = 'AT_ERROR_NO_DETAIL';
      transactionIdToSave = 'AT_NO_REQUEST_ID';
    }

    const payment = new Payment({
      requestId,
      collectorId: collectorId,
      homeownerId,
      amount: parsedAmount,
      phoneNumber,
      transactionId: transactionIdToSave,
      status: paymentStatusToSave,
      paidAt: new Date()
    });
    await payment.save();

    res.status(200).json({
      message: 'Payment processed and recorded!',
      data: response,
      paymentRecord: payment,
    });

  } catch (error) {
    console.error('❌ Payment processing error (before DB save or AT SDK):', error.message);
    if (error.response) {
      console.error('Africa\'s Talking API error response data:', error.response.data);
    }

    const failedPayment = new Payment({
      requestId: req.body.requestId || 'UNKNOWN',
      collectorId: req.body.collectorId || req.user?.collectorId || 'UNKNOWN',
      homeownerId: req.body.homeownerId?._id || 'UNKNOWN',
      amount: parseFloat(req.body.amount) || 0,
      phoneNumber: req.body.phoneNumber || 'UNKNOWN',
      transactionId: transactionIdToSave,
      status: 'Failed_Backend_Error',
      paidAt: new Date()
    });
    try {
      await failedPayment.save();
      console.log("Failed payment attempt recorded in DB.");
    } catch (dbError) {
      console.error("Error saving failed payment attempt:", dbError);
    }

    res.status(500).json({
      error: 'Payment processing failed due to an internal server error or network issue.',
      detail: error.response?.data ? JSON.stringify(error.response.data) : error.message,
    });
  }
};


async function getPaymentsByCollector(req, res) {
  try {
    const { collectorId } = req.params;
    const payments = await Payment.find({ collectorId })
      .sort({ paidAt: -1 })
      .populate('requestId', 'scrapType weight')
      .populate('homeownerId', 'fullName');
    return res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching collector payments:", error);
    return res.status(500).json({ message: "Could not fetch collector payments", error: error.message });
  }
}

async function getPaymentsByHomeowner(req, res) {
  try {
    const homeownerId = req.params.homeownerId;
    const payments = await Payment.find({ homeownerId: homeownerId })
      .populate('requestId', 'scrapType weight')
      .populate('collectorId', 'fullName')
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
}


const recordCollectorPaymentViaPaystack = async (req, res) => {
  try {
    const { requestId, collectorId, phoneNo, amount, reference } = req.body;

    if (!requestId || !collectorId || !phoneNo || !amount || !reference) {
      return res.status(400).json({ error: 'Missing required fields for payment recording.' });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number.' });
    }

    const payment = new Payment({
      requestId,
      collectorId,
      phoneNo,
      amount: parsedAmount,
      reference,
      paymentDate: new Date()
    });

    await payment.save();

    res.status(201).json({
      message: 'Payment recorded successfully via Paystack!',
      payment
    });
  } catch (error) {
    console.error('Error saving Paystack payment:', error.message);
    res.status(500).json({ error: 'Server error saving Paystack payment.' });
  }
};

module.exports = {
  payHomeowner,
  getPaymentsByCollector,
  getPaymentsByHomeowner,
  recordCollectorPaymentViaPaystack,
};