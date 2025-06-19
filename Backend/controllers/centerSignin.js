const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const Center=require('../models/center');

const centerSignin=async(req,res)=>{

    try {
        let {username,password}=req.body;

        username=username.trim().toLowerCase()

        if(!username ||!password){
            return res.status(400).json({message:"Username and Password are required!"})
        }
    
        const center=await Center.findOne({username});
    
        if(!center){
            return res.status(400).json({message:"Collection center does not exist!"})
        }
    
        const isMatch=await bcrypt.compare(password,center.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"})
        }
    
        //token generation
        const token=jwt.sign({
            centerId:center._id,
            username:center.username
        },
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
        );
    
        return res.status(200).cookie('access_token',token,{httpOnly:true}).json({
            message:"Login successfull!",
            success:true,
            token,
            user:{
                id:center._id,
                username:center.username
            }
        })
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
   
}

// get center Info
const getCenterInfo=async(req,res)=>{
    const {centerId}=req.params;
    try {
        const center=await Center.findById(centerId);
        if(!center){
            return res.status(404).json({message:"Collection center not found"});
        }

        return res.status(200).json({
            message:"Collection center Info Fetched Successfully!",
            success:true,
            center
        })

    } catch (error) {
        return res.status(500).json({message:"Error fetching collection center info",error})
        
    }
}

const centerSignout=(req,res)=>{
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
    centerSignin,
    centerSignout,
    getCenterInfo
}