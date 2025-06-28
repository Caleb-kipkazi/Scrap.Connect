// const bcrypt=require("bcrypt");
// const jwt=require("jsonwebtoken");
// const Collector=require('../models/collector');
// const Request = require('../models/Requests');

// const collectorSignin=async(req,res)=>{

//     try {
//         let {username,password}=req.body;

//         username=username.trim().toLowerCase()

//         if(!username ||!password){
//             return res.status(400).json({message:"Username and Password are required!"})
//         }
    
//         const collector=await Collector.findOne({username});
    
//         if(!collector){
//             return res.status(400).json({message:"The collector does not exist!"})
//         }
    
//         const isMatch=await bcrypt.compare(password,collector.password);
//         if(!isMatch){
//             return res.status(400).json({message:"Invalid Password"})
//         }
    
//         //token generation
//         const token=jwt.sign({
//             collectorId:collector._id,
//             username:collector.username
//         },
//         process.env.JWT_SECRET,
//         {expiresIn:"1h"}
//         );
    
//         return res.status(200).cookie('access_token',token,{httpOnly:true}).json({
//             message:"Login successfull!",
//             success:true,
//             token,
//             collectorInfo:collector
//         })
        
//     } catch (error) {
//         return res.status(500).json({message:error.message})
//     }
   
// }

// // get User Info
// const getUserInfo=async(req,res)=>{
//     const {userId}=req.params;
//     try {
//         const user=await User.findById(userId);
//         if(!user){
//             return res.status(404).json({message:"User not found"});
//         }

//         return res.status(200).json({
//             message:"User Info Fetched Successfully!",
//             success:true,
//             user
//         })

//     } catch (error) {
//         return res.status(500).json({message:"Error fetching user info",error})
        
//     }
// }

// // get all requests made to a collector
// const getAllCollectorRequests=async(req,res)=>{
//     const {collectorId}=req.params;

//     try {
//         const requests=await Request.find({collectorId})
//         .sort({pickupDate:1})

//         if(requests.length===0){
//             return res.status(404).json({
//                 message:"No requests assigned to this collector!"
//             })
//         }

//         res.status(200).json({
//             message:"Collector requests fetched successfully!",
//             success:true,
//             totalRequests:requests.length,
//             requests
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message:"Internal server error",error
//         })
//     }
// }

// const userSignout=(req,res)=>{
//     try {
//         res.clearCookie('access_token').status(200).json({
//             message:"Signout successful!",
//             success:true
//         })
//     } catch (error) {
//         return res.status(500).json({message:error.message})
//     }
// }

// module.exports={
//     collectorSignin,
//     getAllCollectorRequests,
//     userSignout,
//     getUserInfo
// }

//PROFILE TEST
// ./controllers/collectorSignin.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Collector = require('../models/collector'); // Make sure path is correct
const Request = require('../models/Requests'); // Make sure path is correct

/**
 * @desc Handles Collector Signin
 * @route POST /api/v1/collector/signin
 * @access Public
 */
const collectorSignin = async (req, res) => {
    try {
        let { username, password } = req.body;

        username = username.trim().toLowerCase();

        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password are required!" });
        }

        const collector = await Collector.findOne({ username });

        if (!collector) {
            return res.status(400).json({ message: "The collector does not exist!" });
        }

        const isMatch = await bcrypt.compare(password, collector.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        // Generate JWT token for collector
        const token = jwt.sign(
            {
                id: collector._id, // Use 'id' for consistency if frontend expects it
                role: 'collector', // Add role to token payload
                username: collector.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // For web (if applicable), set cookie. For mobile, rely on token in response.
        return res.status(200).cookie('access_token', token, { httpOnly: true }).json({
            message: "Login successful!",
            success: true,
            token,
            // Provide collector's ID and role for frontend storage
            collectorId: collector._id,
            userRole: 'collector',
            collectorInfo: { // Send specific info for profile
                fullName: collector.fullName,
                username: collector.username,
                email: collector.email,
                phoneNo: collector.phoneNo,
                centerId: collector.center // Assuming 'center' holds the ID of the center
            }
        });

    } catch (error) {
        console.error("Error during collector signin:", error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Gets Collector's profile information by ID
 * @route GET /api/v1/collector/info/:collectorId
 * @access Private (assuming authenticated collector)
 */
const getCollectorInfo = async (req, res) => {
    const { collectorId } = req.params;
    try {
        const collector = await Collector.findById(collectorId)
            .select('-password -resetOtp -otpExpires'); // Exclude sensitive fields

        if (!collector) {
            return res.status(404).json({ message: "Collector not found" });
        }

        return res.status(200).json({
            message: "Collector Info Fetched Successfully!",
            success: true,
            collector: collector
        });

    } catch (error) {
        console.error("Error fetching collector info:", error);
        return res.status(500).json({ message: "Error fetching collector info", error: error.message });
    }
};

/**
 * @desc Gets all requests made to a collector
 * @route GET /api/v1/requests/collector/:collectorId/list/
 * @access Private (assuming authenticated collector)
 */
const getAllCollectorRequests = async (req, res) => {
    const { collectorId } = req.params;

    try {
        const requests = await Request.find({ collectorId })
            .populate('homeownerId', 'username phoneNo') // Populate homeowner info
            .populate('collectionCenter', 'centerName phoneNo') // Populate center info
            .sort({ pickupDate: 1 }); // Sort by pickup date

        if (requests.length === 0) {
            return res.status(404).json({
                message: "No requests assigned to this collector!"
            });
        }

        res.status(200).json({
            message: "Collector requests fetched successfully!",
            success: true,
            totalRequests: requests.length,
            requests
        });
    } catch (error) {
        console.error("Error fetching collector requests:", error);
        return res.status(500).json({
            message: "Internal server error", error: error.message
        });
    }
};

/**
 * @desc Handles Collector Signout
 * @route POST /api/v1/collector/signout
 * @access Public (token invalidated on client-side primarily)
 */
const collectorSignout = async (req, res) => {
    try {
        // In a stateless JWT system, signout is primarily handled on the client by deleting the token.
        // If you're using HTTP-only cookies, clearing the cookie is also relevant.
        res.clearCookie('access_token').status(200).json({
            message: "Collector signed out successfully!",
            success: true
        });
    } catch (error) {
        console.error("Error during collector signout:", error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    collectorSignin,
    getCollectorInfo, // Export the new function
    getAllCollectorRequests,
    collectorSignout // Export the new function
};