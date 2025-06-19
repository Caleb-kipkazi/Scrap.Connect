const bcrypt=require("bcrypt");
const Admin=require('../models/admin');

const adminSignup=async(req,res)=>{
    try {
        let {
            email,
            username,
            password,
            phoneNo,
        }=req.body;

        // Trim and convert to lowercase
        email=email.trim().toLowerCase();
        username=username.trim().toLowerCase();
        
        if(!(username && email && password)){
            return res.status(400).json({message: 'All fields are required'});
          }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return res.status(400).json({message: 'Invalid email'});
          }else if(!/^[a-zA-Z\s]*$/.test(username)){
            return res.status(400).json({message: 'Name must contain only letters'});
          }
        
        //   check if user exists
        const adminExists=await Admin.findOne({email});
        if(adminExists){
            return res.status(400).json({message:"User already exists"});
        }

        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        const newAdmin=new Admin({
            email,
            phoneNo,
            password:hashedPassword,
            username,
        })

        const createdUser=await newAdmin.save();

        return res.status(200).json({
            message:"Account created successfully!",
            admin:createdUser,
            success:true
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


module.exports={
    adminSignup
}