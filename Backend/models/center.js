// This code defines a Mongoose schema for user signup data, including fields for email, username,
// phone number, password, reset OTP,location,center and OTP expiration time.
// This schema is used to create a User model for interacting with a MongoDB database.


const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const centerSignupSchema=new Schema({
centerName:{
    type:String,
    required:true,
    unique:true
},
centerUsername:{
    type:String,
    required:true,
    unique:true
},
email:{
    type:String,
    required:true,
    unique:true
},
phoneNo:{
    type:Number,
    required:true,
    unique:true
},
location:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
resetOtp:{
    type:Number,
    required:false
},
otpExpires:{
    type:Date,
    required:false
}
})

const Center=mongoose.model("Center",centerSignupSchema);
module.exports=Center;