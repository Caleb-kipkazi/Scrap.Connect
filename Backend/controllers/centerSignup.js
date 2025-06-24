// const bcrypt=require("bcrypt");
// const Center=require('../models/center');

// const centerSignup=async(req,res)=>{
//     try {
//         let {
//             email,
//             centerUsername,
//             password,
//             phoneNo,
//             location,
//             centerName
//         }=req.body;

//         // Trim and convert to lowercase
//         email=email.trim().toLowerCase();
//         centerUsername=centerUsername.trim().toLowerCase();
//         location=location.trim().toLowerCase();
//         centerName=centerName.trim().toLowerCase();
        
//         if(!(centerUsername && email && password && phoneNo && location && centerName)){
//             return res.status(400).json({message: 'All fields are required'});
//           }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
//             return res.status(400).json({message: 'Invalid email'});
//           }else if(!/^[a-zA-Z\s]*$/.test(centerUsername)){
//             return res.status(400).json({message: 'Name must contain only letters'});
//           }
        
//         //   check if center exists
//         const centerExists=await Center.findOne({email});
//         if(centerExists){
//             return res.status(400).json({message:"Collection center already exists"});
//         }

//         //hash password
//         const hashedPassword=await bcrypt.hash(password,10);

//         const newCenter=new Center({
//             email,
//             phoneNo,
//             password:hashedPassword,
//             centerUsername,
//             location,
//             centerName
//         })

//         const createdUser=await newCenter.save();

//         return res.status(200).json({
//             message:"Collection center created successfully!",
//             admin:createdUser,
//             success:true
//         })
//     } catch (error) {
//         return res.status(500).json({message:error.message})
//     }
// }


// module.exports={
//     centerSignup
// }

const bcrypt = require("bcrypt"); // Ensure this is 'bcryptjs' if that's what you installed
const Center = require('../models/center');

const centerSignup = async (req, res) => {
    try {
        let {
            email,
            centerUsername,
            password,
            phoneNo,
            location,
            centerName
        } = req.body;

        // Trim and convert to lowercase for consistency and uniqueness checks
        email = email.trim().toLowerCase();
        centerUsername = centerUsername.trim().toLowerCase(); // Keep this if you want username also lowercased
        location = location.trim().toLowerCase();
        centerName = centerName.trim(); // Keep centerName as is for display (not necessarily lowercased)

        // --- Basic Validation ---
        if (!(centerUsername && email && password && phoneNo && location && centerName)) {
            return res.status(400).json({ message: 'All fields are required' });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        } else if (!/^[a-zA-Z0-9\s]*$/.test(centerUsername)) { // Allowing letters, numbers, and spaces for username
            return res.status(400).json({ message: 'Center Username must contain only letters, numbers, or spaces' });
        }

        // --- Uniqueness Checks ---
        // Check if center exists by email (most reliable unique identifier for login)
        const centerExistsByEmail = await Center.findOne({ email });
        if (centerExistsByEmail) {
            return res.status(400).json({ message: "Collection center with this email already exists" });
        }

        // Check if centerUsername is unique if it's also a primary identifier
        const centerExistsByUsername = await Center.findOne({ centerUsername });
        if (centerExistsByUsername) {
            return res.status(400).json({ message: "Collection center with this username already exists" });
        }

        // --- Password Hashing ---
        const hashedPassword = await bcrypt.hash(password, 10);

        // --- Create New Center Instance ---
        const newCenter = new Center({
            email,
            phoneNo,
            password: hashedPassword,
            centerUsername,
            location,
            centerName // Store the original case centerName
        });

        // --- Save to Database ---
        const createdCenter = await newCenter.save();

        // --- Success Response ---
        return res.status(200).json({
            message: "Collection center created successfully!",
            success: true,
            center: { // Send back relevant center info, excluding the hashed password
                _id: createdCenter._id,
                email: createdCenter.email,
                centerUsername: createdCenter.centerUsername,
                centerName: createdCenter.centerName,
                location: createdCenter.location,
                phoneNo: createdCenter.phoneNo
            }
        });
    } catch (error) {
        console.error("Error during center signup:", error);
        return res.status(500).json({ message: error.message || "Server error during signup" });
    }
}

module.exports = {
    centerSignup
}