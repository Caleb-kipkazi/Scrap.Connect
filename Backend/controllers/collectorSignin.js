const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const Collector=require('../models/collector');
const Request = require('../models/Requests');

const collectorSignin=async(req,res)=>{

    try {
        let {username,password}=req.body;

        username=username.trim().toLowerCase()

        if(!username ||!password){
            return res.status(400).json({message:"Username and Password are required!"})
        }
    
        const collector=await Collector.findOne({username});
    
        if(!collector){
            return res.status(400).json({message:"The collector does not exist!"})
        }
    
        const isMatch=await bcrypt.compare(password,collector.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"})
        }
    
        //token generation
        const token=jwt.sign({
            collectorId:collector._id,
            username:collector.username
        },
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
        );
    
        return res.status(200).cookie('access_token',token,{httpOnly:true}).json({
            message:"Login successfull!",
            success:true,
            token,
            collectorInfo:collector
        })
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
   
}

// get User Info
const getUserInfo=async(req,res)=>{
    const {userId}=req.params;
    try {
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        return res.status(200).json({
            message:"User Info Fetched Successfully!",
            success:true,
            user
        })

    } catch (error) {
        return res.status(500).json({message:"Error fetching user info",error})
        
    }
}

// get all requests made to a collector
const getAllCollectorRequests=async(req,res)=>{
    const {collectorId}=req.params;

    try {
        const requests=await Request.find({collectorId})
        .sort({pickupDate:1})

        if(requests.length===0){
            return res.status(404).json({
                message:"No requests assigned to this collector!"
            })
        }

        res.status(200).json({
            message:"Collector requests fetched successfully!",
            success:true,
            totalRequests:requests.length,
            requests
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",error
        })
    }
}

const userSignout=(req,res)=>{
    try {
        res.clearCookie('access_token').status(200).json({
            message:"Signout successful!",
            success:true
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports={
    collectorSignin,
    getAllCollectorRequests,
    userSignout,
    getUserInfo
}