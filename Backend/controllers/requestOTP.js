const Collector = require('../models/collector');
const Center = require('../models/center');
const User=require('../models/userModel');
const nodemailer=require('nodemailer');

const requestOTP=async(req,res)=>{
    const {email}=req.body;
    try {

        let user=await User.findOne({email});

        if(!user){
            user=await Collector.findOne({email})
        }else if (!user){
            user=await Center.findOne({email})
        }else if(!user){
            return res.status(404).json({
                message:"No account found for this email"
            })
        }

        const otp=Math.floor(100000 + Math.random()*900000)
        const otpExpiry=Date.now()+10*60*1000;

        user.resetOtp=otp;
        user.otpExpires=otpExpiry;
        await user.save();


        // sending otp
        const transporter=nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user:process.env.Email_user,
                pass:process.env.Email_Pass
            }
        })

        await transporter.sendMail({
        from: process.env.Email_User,
        to: email,
        subject: "Scrap Connect - Password Reset OTP (Valid for 10 Minutes)",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color: #2c3e50;">🔐 Your One-Time Password (OTP): <span style="color: #e74c3c;">${otp}</span></h2>
        <p>Dear User,</p>

        <p>We received a request to reset the password for your <strong>Scrap Connect</strong> account associated with this email address. To complete the password reset process, please use the OTP provided below:</p>

        <div style="margin: 20px 0; padding: 10px; background-color: #f1f1f1; font-size: 18px; border-left: 4px solid #2ecc71;">
        <strong>OTP:</strong> ${otp}<br>
        <strong>Expires In:</strong> 10 minutes
        </div>

        <p>If you did not request a password reset, please ignore this email. Your account remains secure.</p>

        <p>If you have any questions or need assistance, feel free to contact our support team.</p>

        <br>
        <p>Best regards,</p>
        <p><strong>Scrap Connect Team</strong></p>
        <hr style="margin-top: 30px;">
        <small style="color: #888;">This is an automated message. Please do not reply to this email.</small>
        </div>
     `
});

    res.status(200).json({success:true,message:"OTP sent successfully!"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={
    requestOTP
}