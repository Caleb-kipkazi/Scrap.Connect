// const bcrypt=require("bcrypt");
// const jwt=require("jsonwebtoken");
// const User=require('../models/userModel');

// const userSignin=async(req,res)=>{

//     try {
//         let {username,password}=req.body;

//         username=username.trim().toLowerCase()

//         if(!username ||!password){
//             return res.status(400).json({message:"Username and Password are required!"})
//         }
    
//         const user=await User.findOne({username});
    
//         if(!user){
//             return res.status(400).json({message:"User does not exist!"})
//         }
    
//         const isMatch=await bcrypt.compare(password,user.password);
//         if(!isMatch){
//             return res.status(400).json({message:"Invalid Password"})
//         }
    
//         //token generation
//         const token=jwt.sign({
//             userId:user._id,
//             username:user.username
//         },
//         process.env.JWT_SECRET,
//         {expiresIn:"1h"}
//         );
    
//         return res.status(200).cookie('access_token',token,{httpOnly:true}).json({
//             message:"Login successfull!",
//             success:true,
//             token,
//             user:{
//                 id:user._id,
//                 username:user.username
//             }
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
//     userSignin,
//     userSignout,
//     getUserInfo
// }

//PROFILE TEST
// ./controllers/userSignin.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel'); // Make sure path is correct

/**
 * @desc Handles User (Homeowner) Signin
 * @route POST /api/v1/user/signin
 * @access Public
 */
const userSignin = async (req, res) => {
    try {
        let { username, password } = req.body;

        username = username.trim().toLowerCase();

        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password are required!" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        // Token generation for homeowner
        const token = jwt.sign(
            {
                id: user._id, // Use 'id' for consistency if frontend expects it
                role: 'homeowner', // Add role to token payload
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).cookie('access_token', token, { httpOnly: true }).json({
            message: "Login successful!",
            success: true,
            token,
            // Provide user's ID and role for frontend storage
            userId: user._id, // Renamed from user.id for clarity with userId on frontend
            userRole: 'homeowner',
            userInfo: { // Send specific info for profile
                username: user.username,
                email: user.email, // Assuming email exists on User model
                phoneNo: user.phoneNo // Assuming phoneNo exists on User model
            }
        });

    } catch (error) {
        console.error("Error during user signin:", error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Gets User (Homeowner) profile information by ID
 * @route GET /api/v1/user/info/:userId
 * @access Private (assuming authenticated user)
 */
const getUserInfo = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId)
            .select('-password -resetOtp -otpExpires'); // Exclude sensitive fields

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User Info Fetched Successfully!",
            success: true,
            user: user
        });

    } catch (error) {
        console.error("Error fetching user info:", error);
        return res.status(500).json({ message: "Error fetching user info", error: error.message });
    }
};

/**
 * @desc Handles User (Homeowner) Signout
 * @route POST /api/v1/user/signout
 * @access Public (token invalidated on client-side primarily)
 */
const userSignout = (req, res) => {
    try {
        res.clearCookie('access_token').status(200).json({
            message: "Signout successful!",
            success: true
        });
    } catch (error) {
        console.error("Error during user signout:", error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    userSignin,
    userSignout,
    getUserInfo
};