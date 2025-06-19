const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectorSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
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
  center: {
    type: Schema.Types.ObjectId,
    ref: "Center", 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Collector = mongoose.model("Collector", collectorSchema);
module.exports = Collector;
