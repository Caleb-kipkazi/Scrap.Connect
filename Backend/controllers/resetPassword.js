// resetPassword.js
const Collector = require('../models/collector');
const Center = require('../models/center');
const User=require('../models/userModel') // Assuming User is for homeowners
const bcrypt=require('bcrypt')


const resetPassword=async(req,res)=>{
    const {email,newPassword,otp}=req.body;
    try {

        let user = null;
        let userType = '';

        // Check in User (Homeowner) model first
        user = await User.findOne({email});
        if(user){
            userType = 'homeowner';
        } else {
            // If not a User, check in Collector model
            user = await Collector.findOne({email});
            if(user){
                userType = 'collector';
            } else {
                // If not a Collector, check in Center (Admin) model
                user = await Center.findOne({email});
                if(user){
                    userType = 'admin'; // Using 'admin' for Center model as per your request
                }
            }
        }

        if(!user){
            return res.status(404).json({
                message:"No account found for this email"
            });
        }

        if(String(user.resetOtp) !=String(otp) || Date.now() > new Date(user.otpExpires).getTime()){
            return res.status(400).json({message:"Invalid or expired otp"})
        }

        user.password=await bcrypt.hash(newPassword,10)
        user.resetOtp=null;
        user.otpExpires=null;
        await user.save();

        // Include userType in the success response
        res.status(200).json({message:"Password reset successful!", success:true, userType: userType});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports={
    resetPassword
}