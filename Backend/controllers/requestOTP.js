// requestOTP.js
const Collector = require('../models/collector');
const Center = require('../models/center');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');

const requestOTP = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email }) ||
               await Collector.findOne({ email }) ||
               await Center.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found for this email"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    user.resetOtp = otp;
    user.otpExpires = otpExpiry;
    await user.save();

    // Create transporter with TLS fix
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false // ✅ Bypass self-signed cert error (safe in dev)
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Scrap Connect - Password Reset OTP (Valid for 10 Minutes)",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h2 style="color: #2c3e50;">🔐 Your One-Time Password (OTP): <span style="color: #e74c3c;">${otp}</span></h2>
          <p>Dear User,</p>
          <p>We received a request to reset your <strong>Scrap Connect</strong> password. Use the OTP below to proceed:</p>
          <div style="margin: 20px 0; padding: 10px; background-color: #f1f1f1; font-size: 18px; border-left: 4px solid #2ecc71;">
            <strong>OTP:</strong> ${otp}<br>
            <strong>Expires In:</strong> 10 minutes
          </div>
          <p>If you did not request this, you can safely ignore this email.</p>
          <p>Regards,<br><strong>Scrap Connect Team</strong></p>
          <hr style="margin-top: 30px;">
          <small style="color: #888;">This is an automated message. Please do not reply to this email.</small>
        </div>
      `
    });

    console.log(`✅ OTP ${otp} sent to ${email}`);
    res.status(200).json({ success: true, message: "OTP sent successfully!" });

  } catch (error) {
    console.error("❌ OTP Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  requestOTP
};
