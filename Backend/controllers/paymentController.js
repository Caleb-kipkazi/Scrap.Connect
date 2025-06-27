// const Payment = require('../models/paymentModel');
// const Request = require('../models/requestModel');

// const createPayment = async (req, res) => {
//   try {
//     const { requestId, homeownerId, amount, phoneNumber } = req.body;
//     const collectorId = req.user.id; // decoded from token

//     // Optional: Check if request belongs to this collector
//     const request = await Request.findById(requestId);
//     if (!request || request.collectorId.toString() !== collectorId) {
//       return res.status(403).json({ message: 'Unauthorized or invalid request' });
//     }

//     // Save payment
//     const payment = new Payment({
//       requestId,
//       collectorId,
//       homeownerId,
//       amount,
//       phoneNumber
//     });

//     await payment.save();
//     res.status(201).json({ message: 'Payment recorded successfully', payment });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Payment failed', error: error.message });
//   }
// };

// module.exports = { createPayment };


//GMK
// require("dotenv").config();
// const AfricasTalking = require("africastalking");
// const Payment = require("../models/paymentModel");
// // if you do have a Request model file, make sure the filename matches exactly, e.g.:
// // const Request = require("../models/requestModel");

// const at = AfricasTalking({
//   username: process.env.AT_USERNAME,
//   apiKey:   process.env.AT_API_KEY,
// });

// // rename to payHomeowner so it matches your routes.js import
// async function payHomeowner(req, res) {
//   try {
//     const { requestId, homeownerId, amount, phoneNumber, collectorId } = req.body;
//     // if you want to enforce collector ownership, re-add your Request find here
//     // const request = await Request.findById(requestId);
//     // if (!request || request.collectorId.toString() !== collectorId) {
//     //   return res.status(403).json({ message: "Unauthorized or invalid request" });
//     // }

//     const result = await at.AIRTIME.send({
//       recipients: [
//         {
//           phoneNumber,
//           currencyCode: "KES",
//           amount: amount.toString(),
//         },
//       ],
//     });
//     const airtimeResponse = result.responses[0];

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

//     res.status(201).json({
//       message: "Payment recorded and airtime sent",
//       payment,
//       airtime: airtimeResponse,
//     });
//   } catch (error) {
//     console.error("Payment error:", error);
//     res.status(500).json({ message: "Payment failed", error: error.message });
//   }
// }

// module.exports = { payHomeowner };   
  

//test for payment
// paymentcontroller.js
// require("dotenv").config();
// const AfricasTalking = require("africastalking");
// const Payment = require("../models/paymentModel");
// // If you do have a Request model file and need to enforce collector ownership,
// // uncomment the line below and the related logic in the controller.
// // const Request = require("../models/requestModel");

// const at = AfricasTalking({
//   username: process.env.AT_USERNAME,
//   apiKey: process.env.AT_API_KEY,
// });

// async function payHomeowner(req, res) {
//   try {
//     const { requestId, homeownerId, amount, phoneNumber, collectorId } = req.body;

//     // --- Backend Input Validation ---
//     if (!requestId || !homeownerId || !amount || !phoneNumber) {
//       console.error("Missing required payment details in request body:", { requestId, homeownerId, amount, phoneNumber });
//       return res.status(400).json({ message: "Missing required payment details." });
//     }

//     const parsedAmount = parseFloat(amount); // Ensure amount is a number
//     if (isNaN(parsedAmount) || parsedAmount <= 0) {
//       console.error("Invalid amount provided:", amount);
//       return res.status(400).json({ message: "Invalid amount provided. Must be a positive number." });
//     }

//     // --- Optional: Collector ownership enforcement (uncomment if Request model is used) ---
//     // try {
//     //   const request = await Request.findById(requestId);
//     //   if (!request || request.collectorId.toString() !== collectorId) {
//     //     console.warn(`Unauthorized payment attempt: Request ${requestId} not found or collector ${collectorId} not assigned.`);
//     //     return res.status(403).json({ message: "Unauthorized or invalid request for this collector." });
//     //   }
//     // } catch (findError) {
//     //   console.error("Error finding request in DB for authorization:", findError);
//     //   return res.status(500).json({ message: "Server error during authorization check." });
//     // }


//     // --- Construct recipients array correctly for Africa's Talking SDK ---
//     // The 'amount' should be a string representing the numerical value,
//     // and 'currencyCode' is a separate field.
//     const recipientsArray = [
//       {
//         phoneNumber: phoneNumber, // Ensure this is the direct string from req.body
//         currencyCode: "KES",
//         amount: parsedAmount.toFixed(2), // Format to 2 decimal places as a string
//       },
//     ];

//     console.log("Backend sending to Africa's Talking with recipients:", recipientsArray);

//     const result = await at.AIRTIME.send({
//       recipients: recipientsArray, // Pass the correctly formatted array
//     });

//     // Check Africa's Talking response for errors, as they often return 200 OK with errors in body
//     if (result.errorMessage || !result.responses || result.responses.length === 0) {
//       console.error("Africa's Talking API returned an error or empty response:", result);
//       return res.status(400).json({
//         message: "Payment failed via Africa's Talking API (SDK error).",
//         error: result.errorMessage || "Unknown error from Africa's Talking",
//         atResponse: result // Include full AT response for debugging
//       });
//     }

//     const airtimeResponse = result.responses[0];

//     // Check individual response status from Africa's Talking
//     if (airtimeResponse.status !== 'Success') { // Check against AT's success status
//         console.error("Africa's Talking individual recipient status not successful:", airtimeResponse);
//         return res.status(400).json({
//             message: "Payment failed for recipient via Africa's Talking.",
//             error: airtimeResponse.status + ": " + airtimeResponse.errorMessage,
//             atResponse: airtimeResponse
//         });
//     }

//     // Save payment record to your database
//     const payment = new Payment({
//       requestId,
//       collectorId,
//       homeownerId,
//       amount: parsedAmount, // Save the actual number for your DB
//       phoneNumber,
//       transactionId: airtimeResponse.requestId,
//       status: airtimeResponse.status,
//     });
//     await payment.save();

//     res.status(201).json({
//       message: "Payment recorded and airtime sent successfully!",
//       payment,
//       airtime: airtimeResponse,
//     });

//   } catch (error) {
//     console.error("Payment error in payHomeowner controller:", error);

//     // Provide more specific error message if available from Axios/Africa's Talking response
//     const errorMessage = error.response?.data?.errorMessage || error.response?.data?.message || error.message;
//     const statusCode = error.response?.status || 500;

//     res.status(statusCode).json({
//       message: "Payment failed due to an error.",
//       error: errorMessage,
//       details: error.response?.data || null // Include full response data for debugging
//     });
//   }
// }

// module.exports = { payHomeowner };


//bypassing
// paymentcontroller.js
// require("dotenv").config();
// // const AfricasTalking = require("africastalking"); // We will no longer directly use the SDK for the Airtime send
// const axios = require("axios"); // Import axios for direct API call
// const Payment = require("../models/paymentModel");
// // If you do have a a Request model file, make sure the filename matches exactly, e.g.:
// // const Request = require("../models/requestModel");

// // Africa's Talking API credentials directly from environment variables
// const AF_TALKING_USERNAME = process.env.AT_USERNAME;
// const AF_TALKING_API_KEY = process.env.AT_API_KEY;

// async function payHomeowner(req, res) {
//   try {
//     const { requestId, homeownerId, amount, phoneNumber, collectorId } = req.body;

//     // --- Backend Input Validation ---
//     if (!requestId || !homeownerId || !amount || !phoneNumber) {
//       console.error("Missing required payment details in request body:", { requestId, homeownerId, amount, phoneNumber });
//       return res.status(400).json({ message: "Missing required payment details." });
//     }

//     const parsedAmount = parseFloat(amount); // Ensure amount is a number
//     if (isNaN(parsedAmount) || parsedAmount <= 0) {
//       console.error("Invalid amount provided:", amount);
//       return res.status(400).json({ message: "Invalid amount provided. Must be a positive number." });
//     }

//     // --- Optional: Collector ownership enforcement (uncomment if Request model is used) ---
//     // try {
//     //   const request = await Request.findById(requestId);
//     //   if (!request || request.collectorId.toString() !== collectorId) {
//     //     console.warn(`Unauthorized payment attempt: Request ${requestId} not found or collector ${collectorId} not assigned.`);
//     //     return res.status(403).json({ message: "Unauthorized or invalid request for this collector." });
//     //   }
//     // } catch (findError) {
//     //   console.error("Error finding request in DB for authorization:", findError);
//     //   return res.status(500).json({ message: "Server error during authorization check." });
//     // }


//     // --- Construct the payload directly for Africa's Talking API ---
//     // Based on the 415 error, we'll try sending JSON directly,
//     // as their error message explicitly said "Expected: application/json".
//     const africaTalkingPayload = {
//       username: AF_TALKING_USERNAME,
//       recipients: [
//         {
//           phoneNumber: phoneNumber, // This must be a string, not an object
//           amount: parsedAmount, // Send as number, will be formatted by Africa's Talking
//           currencyCode: "KES"
//         }
//       ]
//     };

//     console.log("Backend sending direct request to Africa's Talking with payload:", africaTalkingPayload);

//     const atResponse = await axios.post(
//       'https://api.africastalking.com/version1/airtime/send',
//       africaTalkingPayload, // Send the JSON payload directly
//       {
//         headers: {
//           'Content-Type': 'application/json', // Explicitly set to JSON
//           'Accept': 'application/json', // Accept JSON response
//           'apiKey': AF_TALKING_API_KEY // Your Africa's Talking API Key
//         }
//       }
//     );

//     // Process Africa's Talking response
//     // The response structure might vary slightly from SDK's response
//     // Check for success or error based on Africa's Talking API documentation
//     const airtimeResult = atResponse.data;

//     if (airtimeResult.errorMessage || !airtimeResult.responses || airtimeResult.responses.length === 0) {
//       console.error("Africa's Talking API returned an error or empty response data:", airtimeResult);
//       return res.status(400).json({
//         message: "Payment failed via Africa's Talking API.",
//         error: airtimeResult.errorMessage || "Unknown error from Africa's Talking",
//         atResponse: airtimeResult // Include full AT response for debugging
//       });
//     }

//     const airtimeResponseDetail = airtimeResult.responses[0]; // Get the first recipient's response

//     // Check individual recipient's status from Africa's Talking
//     if (airtimeResponseDetail.status !== 'Success') { // Check against AT's success status
//         console.error("Africa's Talking individual recipient status not successful:", airtimeResponseDetail);
//         return res.status(400).json({
//             message: "Payment failed for recipient via Africa's Talking.",
//             error: airtimeResponseDetail.status + ": " + airtimeResponseDetail.errorMessage,
//             atResponse: airtimeResponseDetail
//         });
//     }

//     // Save payment record to your database
//     const payment = new Payment({
//       requestId,
//       collectorId,
//       homeownerId,
//       amount: parsedAmount, // Save the actual number for your DB
//       phoneNumber,
//       transactionId: airtimeResponseDetail.requestId, // Use the requestId from AT's response
//       status: airtimeResponseDetail.status,
//     });
//     await payment.save();

//     res.status(201).json({
//       message: "Payment recorded and airtime sent successfully!",
//       payment,
//       airtime: airtimeResult, // Send back the full AT response for debugging
//     });

//   } catch (error) {
//     console.error("Payment error in payHomeowner controller:", error);

//     // Provide more specific error message if available from Axios/Africa's Talking response
//     const errorMessage = error.response?.data?.errorMessage || error.response?.data?.message || error.message;
//     const statusCode = error.response?.status || 500;

//     res.status(statusCode).json({
//       message: "Payment failed due to an error.",
//       error: errorMessage,
//       details: error.response?.data || null // Include full response data for debugging
//     });
//   }
// }

// module.exports = { payHomeowner };

//chat gpt test

// controllers/paymentController.js or wherever you store your controllers

const axios = require('axios');

const payHomeowner = async (req, res) => {
  try {
    const { phoneNumber, amount } = req.body;

    if (!phoneNumber || !amount) {
      return res.status(400).json({ error: 'Phone number and amount are required' });
    }

    const response = await axios.post(
      'https://api.africastalking.com/version1/airtime/send',
      {
        username: 'GMK', // Replace with your Africa's Talking username
        recipients: JSON.stringify([
          {
            phoneNumber,
            amount: String(amount), // Ensure amount is a string
            currencyCode: 'KES',
          },
        ]),
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          apiKey: process.env.AT_API_KEY, // Make sure this is set in your environment
        },
      }
    );

    console.log('✅ Airtime sent:', response.data);

    res.status(200).json({
      message: 'Airtime sent successfully',
      data: response.data,
    });

  } catch (error) {
    console.error('❌ Payment error:', error.response?.data || error.message);
    res.status(400).json({
      error: 'Airtime payment failed',
      detail: error.response?.data || error.message,
    });
  }
};

module.exports = {
  payHomeowner,
};
