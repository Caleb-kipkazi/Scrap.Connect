// controllers/requestController.js
const Request = require('../models/Request');
const User = require('../models/User');

const createRequest = async (req, res) => {
  try {
    const userId = req.user.id; // From the JWT token middleware
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const {
      location,
      pickupDate,
      pickupTime,
      scrapType,
      description,
      weight,
      collectionCenter,
      imageUrl
    } = req.body;

    const newRequest = new Request({
      homeownerId: userId,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      location,
      pickupDate,
      pickupTime,
      scrapType,
      description,
      weight,
      collectionCenter,
      imageUrl,
    });

    await newRequest.save();
    res.status(201).json({ message: "Request submitted successfully", request: newRequest });

  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createRequest };
