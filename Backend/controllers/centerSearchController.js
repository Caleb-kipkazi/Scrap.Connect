// backend/controllers/centerSearchController.js
const Center = require('../models/center'); // Import your existing Center model

const getCentersByLocationForHomeowner = async (req, res) => {
  try {
    const { location } = req.query; // Expect location as a query parameter

    if (!location) {
      return res.status(400).json({ message: "Location query parameter is required." });
    }

    // Perform a case-insensitive search on the 'location' field of the Center model
    const centers = await Center.find({
      location: { $regex: new RegExp(location, 'i') }
    }).select('centerName location'); // Only return centerName and location

    if (centers.length === 0) {
      return res.status(404).json({ message: "No registered centers found for this location." });
    }

    // Format the output to be simple for the frontend picker
    const formattedCenters = centers.map(center => ({
      id: center._id,
      name: center.centerName, // Use centerName for the frontend display
      location: center.location
    }));

    res.status(200).json({
      message: 'Registered centers fetched successfully by location',
      success: true,
      centers: formattedCenters,
    });

  } catch (error) {
    console.error('Error fetching registered centers by location:', error);
    res.status(500).json({
      message: 'Error fetching registered centers by location',
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getCentersByLocationForHomeowner
};
