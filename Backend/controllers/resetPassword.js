const Collector = require('../models/collector');
const Center = require('../models/center');
const User=require('../models/userModel')
const bcrypt=require('bcrypt')


const resetPassword=async(req,res)=>{
    const {email,newPassword,otp}=req.body;
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
        
        if(String(user.resetOtp) !=String(otp) || Date.now() > new Date(user.otpExpires).getTime()){
            return res.status(400).json({message:"Invalid or expired otp"})
        }

        user.password=await bcrypt.hash(newPassword,10)
        user.resetOtp=null;
        user.otpExpires=null;
        await user.save();

        res.status(200).json({message:"Password reset succesful!",success:true})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports={
    resetPassword
}