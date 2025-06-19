const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const Center=require('../models/center');
const Collector = require('../models/collector');
const Requests=require('../models/Requests')

const centerSignin=async(req,res)=>{

    try {
        let {centerUsername,password}=req.body;

        centerUsername=centerUsername.trim().toLowerCase()

        if(!centerUsername ||!password){
            return res.status(400).json({message:"Username and Password are required!"})
        }
    
        const center=await Center.findOne({centerUsername});
    
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

// get all registered collectors of the collection center
const getCollectors=async(req,res)=>{
    const {centerId}=req.params;
    try {
        const center=await Center.findById(centerId);
        if(!center){
            return res.status(404).json({message:"Collection center not found"});
        }

        const collectors=await Collector.find({center:centerId});

        if(collectors.length===0){
            return res.status(404).json({message:"No collectors registered for this collection center"});
        }
        return res.status(200).json({
            message:"Collectors fetched successfully!",
            success:true,
            collectors:collectors,
            totalCollectors:collectors.length
        })
    } catch (error) {
        return res.status(500).json({message:"Error fetching collectors",error})
    }
}

// get all center requests
const getAllCenterRequests=async(req,res)=>{
    const {centerId}=req.params;

    try {
        const center =await Center.findById(centerId);

        if(!center){
            return res.status(404).json({message:"Collection center not found"});
        }

        const requests=await Requests.find({collectionCenter:centerId})

        if(requests.length===0){
            return res.status(404).json({message:"No collection requests made for this collection center"});
            }
            return res.status(200).json({
                message:"Collection Requests fetched successfully!",
                success:true,
                requests:requests,
                totalRequests:requests.length
            })
        }
        catch (error) {
        return res.status(500).json({
            message:"Error fetching center requests",
            success:false
        })
    }

}


module.exports={
    centerSignin,
    centerSignout,
    getCenterInfo,
    getCollectors,
    getAllCenterRequests
}