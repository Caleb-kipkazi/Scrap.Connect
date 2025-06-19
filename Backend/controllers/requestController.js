const Request = require('../models/Requests');
const User = require('../models/userModel');
const Center=require('../models/center');

const createRequest = async (req, res) => {
  try {
    const {userId} = req.params

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    let {
      location,
      pickupDate,
      pickupTime,
      scrapType,
      description,
      weight,
      collectionCenter,
      imageUrl
    } = req.body;

    // Confirm the center exists
    const center = await Center.findById(collectionCenter);
    if (!center) {
      return res.status(404).json({ message: "Collection center not found" });
    }

    const newRequest = new Request({
      homeownerId: userId,
      fullName: user.username,
      phoneNumber: user.phoneNo,
      location,
      pickupDate,
      pickupTime,
      scrapType,
      description,
      weight,
      collectionCenter:center._id,
      imageUrl
    });

    await newRequest.save();

    res.status(201).json({
      message: "Request submitted successfully",
      request: newRequest,
      success: true
    });

  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { 
  createRequest 
};
