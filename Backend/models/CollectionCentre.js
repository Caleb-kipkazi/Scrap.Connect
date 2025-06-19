const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionCenterSchema = new Schema({
  centerName: {
    type: String,
    required: true,
  },
  centerUsername: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetOtp:{
    type:Number,
    required:false
  },  
  otpExpires:{
    type:Date,
    required:false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('CollectionCenter', collectionCenterSchema);
