// smsService.js
// This file handles the integration with Africa's Talking SMS API.

const AfricasTalking = require('africastalking');

// 1. Initialize Africa's Talking SDK
// It's crucial to load your credentials from environment variables for security.
// Ensure your .env file has AT_USERNAME and AT_API_KEY set.
// For sandbox testing, AT_USERNAME should be 'sandbox' and AT_API_KEY
// should be your sandbox API key from the Africa's Talking dashboard.
// For production, use your live application's username and API key.
const africastalking = AfricasTalking({
  username: process.env.AT_USERNAME, // Your Africa's Talking username (e.g., 'sandbox' or your live username)
  apiKey: process.env.AT_API_KEY     // Your Africa's Talking API Key
});

// Get the SMS service instance
const sms = africastalking.SMS;

/**
 * Sends an SMS message using Africa's Talking API.
 * @param {string} to - The recipient's phone number in international format (e.g., '+2547XXXXXXXX').
 * @param {string} message - The content of the SMS message.
 * @param {string} [from] - Optional. Your custom sender ID (e.g., 'ScrapCon').
 * Must be registered and approved by Africa's Talking.
 * If not provided, Africa's Talking uses a default sender ID (e.g., 'AFRICASTKNG' for sandbox).
 */
const sendSMS = async (to, message, from = undefined) => {
  try {
    // Validate inputs
    if (!to || !message) {
      throw new Error('Recipient number and message content are required to send an SMS.');
    }

    // Basic validation for phone number format (can be enhanced)
    if (!to.startsWith('+')) {
      console.warn(`Warning: Phone number '${to}' does not start with '+'. Africa's Talking requires international format.`);
      // You might want to throw an error or attempt to prefix here if you're certain of the country
      // For this specific case (Kenya, assuming 7XX...), you might want to adjust
      // For example: if (!to.startsWith('+254')) { to = '+254' + to.replace(/^0/, ''); }
      // However, the `formatPhoneNumber` in `requestcontroller.js` is already doing this for Kenya.
    }


    const options = {
      to: to,
      message: message,
      // If you have a custom sender ID approved by Africa's Talking, uncomment and set it here.
      // Otherwise, leave it commented or `undefined` to use Africa's Talking's default/assigned Sender ID.
      // from: from // e.g., 'MyAppName'
    };

    // If a 'from' (sender ID) is explicitly provided and is not undefined, add it to options.
    if (from !== undefined) {
      options.from = from;
    }

    console.log(`Attempting to send SMS to: ${options.to}`);
    console.log(`Message: "${options.message}"`);
    if (options.from) {
      console.log(`Sender ID: "${options.from}"`);
    }

    const response = await sms.send(options);
    console.log('SMS sent successfully. Africa\'s Talking Response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Error sending SMS via Africa\'s Talking:', error.message);
    // You might want to log the full error object in development/debugging for more details
    // console.error('Full Error Object:', error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};

module.exports = {
  sendSMS
};