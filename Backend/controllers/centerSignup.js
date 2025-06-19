const bcrypt=require("bcrypt");
const Center=require('../models/center');

const centerSignup=async(req,res)=>{
    try {
        let {
            email,
            username,
            password,
            phoneNo,
            location,
            centerName
        }=req.body;

        // Trim and convert to lowercase
        email=email.trim().toLowerCase();
        username=username.trim().toLowerCase();
        location=location.trim().toLowerCase();
        centerName=centerName.trim().toLowerCase();
        
        if(!(username && email && password && phoneNo && location && centerName)){
            return res.status(400).json({message: 'All fields are required'});
          }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return res.status(400).json({message: 'Invalid email'});
          }else if(!/^[a-zA-Z\s]*$/.test(username)){
            return res.status(400).json({message: 'Name must contain only letters'});
          }
        
        //   check if center exists
        const centerExists=await Center.findOne({email});
        if(centerExists){
            return res.status(400).json({message:"Collection center already exists"});
        }

        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        const newCenter=new Center({
            email,
            phoneNo,
            password:hashedPassword,
            username,
            location,
            centerName
        })

        const createdUser=await newCenter.save();

        return res.status(200).json({
            message:"Collection center created successfully!",
            admin:createdUser,
            success:true
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


module.exports={
    centerSignup
}