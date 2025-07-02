// const Request = require('../models/Requests');
// const User = require('../models/userModel');
// const Center = require('../models/center');
// const Collector = require('../models/collector');

// // Create new scrap request
// const createRequest = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "Homeowner user not found" });

//     let {
//       location,
//       pickupDate,
//       pickupTime,
//       scrapType,
//       details,
//       weight,
//       selectedCollectionCenterName,
//       imageUrl
//     } = req.body;

//     const description = details;
//     const center = await Center.findOne({ centerName: selectedCollectionCenterName });
//     if (!center) {
//       return res.status(404).json({ message: "Selected collection center not found. Please choose an existing one." });
//     }

//     const newRequest = new Request({
//       homeownerId: userId,
//       fullName: user.username,
//       phoneNumber: user.phoneNo,
//       location,
//       pickupDate,
//       pickupTime,
//       scrapType,
//       description,
//       weight,
//       collectionCenter: center._id,
//       imageUrl
//     });

//     await newRequest.save();

//     res.status(201).json({
//       message: "Scrap request submitted successfully",
//       request: newRequest,
//       success: true
//     });

//   } catch (error) {
//     console.error("Error creating request:", error);
//     res.status(500).json({ message: "Server error creating request", error: error.message });
//   }
// };

// // Assign collector to request
// const assignCollectorToRequest = async (req, res) => {
//   const { requestId, collectorId } = req.body;

//   try {
//     const request = await Request.findById(requestId);
//     if (!request) {
//       return res.status(404).json({ message: "Request not found!" });
//     }

//     if (request.collectorId) {
//       return res.status(400).json({ message: "This request has already been assigned to a collector." });
//     }

//     const collector = await Collector.findById(collectorId);
//     if (!collector) {
//       return res.status(404).json({ message: "Collector not found!" });
//     }

//     if (String(request.collectionCenter) !== String(collector.center)) {
//       return res.status(400).json({ message: "Collector does not belong to the collection center the request was made to!" });
//     }

//     request.collectorId = collectorId;
//     request.status = 'approved';
//     request.approvedAt = new Date();

//     await request.save();

//     const populatedRequest = await Request.findById(requestId)
//       .populate('collectorId')
//       .populate('collectionCenter');

//     res.status(200).json({
//       message: "Collector assigned to request successfully!",
//       success: true,
//       request: populatedRequest
//     });

//   } catch (error) {
//     res.status(500).json({ message: "server error", error });
//   }
// };

// // Get all requests by homeowner
// const getAllUserRequests = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     const allRequests = await Request.find({ homeownerId: userId });
//     res.status(200).json({
//       message: "User Requests fetched successfully!",
//       success: true,
//       user: user.username,
//       totalRequests: allRequests.length,
//       requests: allRequests
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Get approved requests by homeowner
// const getUserApprovedRequests = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     const allApprovedRequests = await Request.find({ homeownerId: userId, status: "approved" });
//     res.status(200).json({
//       message: "User Approved Requests fetched successfully!",
//       success: true,
//       user: user.username,
//       totalRequests: allApprovedRequests.length,
//       requests: allApprovedRequests
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Get pending requests by homeowner
// const getUserPendingRequests = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     const allPendingRequests = await Request.find({ homeownerId: userId, status: "pending" });
//     res.status(200).json({
//       message: "User Pending Requests fetched successfully!",
//       success: true,
//       user: user.username,
//       totalRequests: allPendingRequests.length,
//       requests: allPendingRequests
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Get rejected requests by homeowner
// const getUserRejectedRequests = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     const allRejectedRequests = await Request.find({ homeownerId: userId, status: "rejected" });
//     res.status(200).json({
//       message: "User Rejected Requests fetched successfully!",
//       success: true,
//       user: user.username,
//       totalRequests: allRejectedRequests.length,
//       requests: allRejectedRequests
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Get collected requests
// const getUserCollectedRequests = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     const allCollectedRequests = await Request.find({ homeownerId: userId, status: "collected" });
//     res.status(200).json({
//       message: "User Collected Requests fetched successfully!",
//       success: true,
//       user: user.username,
//       totalRequests: allCollectedRequests.length,
//       requests: allCollectedRequests
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Get points for approved requests
// const getUserApprovedPoints = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     const allApprovedRequests = await Request.find({ homeownerId: userId, status: "approved" });
//     const totalPoints = allApprovedRequests.length * 10;
//     res.status(200).json({
//       message: "User Points fetched successfully!",
//       success: true,
//       user: user.username,
//       totalPoints: totalPoints
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Get requests by status (admin/general)
// const getRequestByStatus = async (req, res) => {
//   const { status } = req.params;

//   try {
//     const allRequests = await Request.find({ status });
//     res.status(200).json({
//       message: "Requests fetched successfully!",
//       success: true,
//       totalRequests: allRequests.length,
//       Requests: allRequests
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Update request status
// const updateRequestStatus = async (req, res) => {
//   const { requestId } = req.params;
//   const { status } = req.body;

//   const validStatuses = ['pending', 'approved', 'rejected', 'collected'];
//   if (!validStatuses.includes(status)) {
//     return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
//   }

//   try {
//     const request = await Request.findById(requestId);
//     if (!request) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     request.status = status;
//     if (status === 'approved') request.approvedAt = new Date();
//     if (status === 'collected') request.completedAt = new Date();

//     await request.save();

//     res.status(200).json({
//       message: "Request status updated successfully",
//       success: true,
//       request
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // ✅ NEW: Get all requests by center with optional status filter
// const getAllCenterRequests = async (req, res) => {
//   const { centerId } = req.params;
//   const { status } = req.query;

//   try {
//     const center = await Center.findById(centerId);
//     if (!center) {
//       return res.status(404).json({ message: "Center not found!" });
//     }

//     const query = { collectionCenter: centerId };
//     if (status) {
//       query.status = status;
//     }

//     const requests = await Request.find(query)
//       .populate('homeownerId', 'username')
//       .populate('collectorId', 'fullName');

//     res.status(200).json({ requests }); // 🔄 Return the populated requests directly

//   } catch (error) {
//     console.error("Error fetching center requests:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Get basic user info
// const getUserInfo = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({
//       message: "User Info Fetched Successfully!",
//       success: true,
//       user
//     });

//   } catch (error) {
//     console.error("Error fetching user info:", error);
//     res.status(500).json({ message: "Error fetching user info", error });
//   }
// };

// module.exports = {
//   createRequest,
//   assignCollectorToRequest,
//   getAllUserRequests,
//   getUserApprovedRequests,
//   getUserPendingRequests,
//   getUserRejectedRequests,
//   getUserCollectedRequests,
//   getUserApprovedPoints,
//   getRequestByStatus,
//   updateRequestStatus,
//   getAllCenterRequests,
//   getUserInfo
// };

// requestController.js
// requestController.js
// const Request = require('../models/Requests');
// const User = require('../models/userModel');
// const Center = require('../models/center');
// const Collector = require('../models/collector');

// // Create new scrap request
// const createRequest = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "Homeowner user not found" });

//     let {
//       location,
//       pickupDate,
//       pickupTime,
//       scrapType,
//       details,
//       weight,
//       selectedCollectionCenterName,
//       imageUrl
//     } = req.body;

//     const description = details;
//     const center = await Center.findOne({ centerName: selectedCollectionCenterName });
//     if (!center) {
//       return res.status(404).json({ message: "Selected collection center not found. Please choose an existing one." });
//     }

//     const newRequest = new Request({
//       homeownerId: userId,
//       fullName: user.username,
//       phoneNumber: user.phoneNo,
//       location,
//       pickupDate,
//       pickupTime,
//       scrapType,
//       description,
//       weight,
//       collectionCenter: center._id,
//       imageUrl
//     });

//     await newRequest.save();

//     res.status(201).json({
//       message: "Scrap request submitted successfully",
//       request: newRequest,
//       success: true
//     });

//   } catch (error) {
//     console.error("Error creating request:", error);
//     res.status(500).json({ message: "Server error creating request", error: error.message });
//   }
// };

// // Assign collector to request
// const assignCollectorToRequest = async (req, res) => {
//   const { requestId, collectorId } = req.body;

//   try {
//     const request = await Request.findById(requestId);
//     if (!request) {
//       return res.status(404).json({ message: "Request not found!" });
//     }

//     if (request.collectorId) {
//       return res.status(400).json({ message: "This request has already been assigned to a collector." });
//     }

//     const collector = await Collector.findById(collectorId);
//     if (!collector) {
//       return res.status(404).json({ message: "Collector not found!" });
//     }

//     if (String(request.collectionCenter) !== String(collector.center)) {
//       return res.status(400).json({ message: "Collector does not belong to the collection center the request was made to!" });
//     }

//     request.collectorId = collectorId;
//     request.status = 'approved';
//     request.approvedAt = new Date();

//     await request.save();

//     const populatedRequest = await Request.findById(requestId)
//       .populate('collectorId', 'fullName phoneNo') // Corrected to phoneNo
//       .populate('collectionCenter', 'centerName phoneNo'); // Corrected to phoneNo

//     res.status(200).json({
//       message: "Collector assigned to request successfully!",
//       success: true,
//       request: populatedRequest
//     });

//   } catch (error) {
//     res.status(500).json({ message: "server error", error });
//   }
// };

// // Get all requests by homeowner
// const getAllUserRequests = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     // --- MODIFIED: Use .populate() to fetch center and collector details with correct field names ---
//     const allRequests = await Request.find({ homeownerId: userId })
//       .populate('collectionCenter', 'centerName phoneNo') // Populate collectionCenter with name and phoneNo
//       .populate('collectorId', 'fullName phoneNo'); // Populate collector with full name and phoneNo

//     res.status(200).json({
//       message: "User Requests fetched successfully!",
//       success: true,
//       user: user.username,
//       totalRequests: allRequests.length,
//       requests: allRequests
//     });

//   } catch (error) {
//     console.error("Error fetching user requests:", error); // Added console.error for better debugging
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Get approved requests by homeowner
// const getUserApprovedRequests = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     // --- MODIFIED: Also apply populate with correct field names ---
//     const allApprovedRequests = await Request.find({ homeownerId: userId, status: "approved" })
//       .populate('collectionCenter', 'centerName phoneNo')
//       .populate('collectorId', 'fullName phoneNo');

//     res.status(200).json({
//       message: "User Approved Requests fetched successfully!",
//       success: true,
//       user: user.username,
//       totalRequests: allApprovedRequests.length,
//       requests: allApprovedRequests
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Get pending requests by homeowner
// const getUserPendingRequests = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     // --- MODIFIED: Also apply populate with correct field names ---
//     const allPendingRequests = await Request.find({ homeownerId: userId, status: "pending" })
//       .populate('collectionCenter', 'centerName phoneNo')
//       .populate('collectorId', 'fullName phoneNo');

//     res.status(200).json({
//       message: "User Pending Requests fetched successfully!",
//       success: true,
//       user: user.username,
//       totalRequests: allPendingRequests.length,
//       requests: allPendingRequests
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Get rejected requests by homeowner
// const getUserRejectedRequests = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     // --- MODIFIED: Also apply populate with correct field names ---
//     const allRejectedRequests = await Request.find({ homeownerId: userId, status: "rejected" })
//       .populate('collectionCenter', 'centerName phoneNo')
//       .populate('collectorId', 'fullName phoneNo');

//     res.status(200).json({
//       message: "User Rejected Requests fetched successfully!",
//       success: true,
//       user: user.username,
//       totalRequests: allRejectedRequests.length,
//       requests: allRejectedRequests
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Get collected requests
// const getUserCollectedRequests = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     // --- MODIFIED: Also apply populate with correct field names ---
//     const allCollectedRequests = await Request.find({ homeownerId: userId, status: "collected" })
//       .populate('collectionCenter', 'centerName phoneNo')
//       .populate('collectorId', 'fullName phoneNo');

//     res.status(200).json({
//       message: "User Collected Requests fetched successfully!",
//       success: true,
//       user: user.username,
//       totalRequests: allCollectedRequests.length,
//       requests: allCollectedRequests
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Get points for approved requests
// const getUserApprovedPoints = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found!" });

//     // No populate needed here as it only counts approved requests.
//     const allApprovedRequests = await Request.find({ homeownerId: userId, status: "approved" });
//     const totalPoints = allApprovedRequests.length * 10;
//     res.status(200).json({
//       message: "User Points fetched successfully!",
//       success: true,
//       user: user.username,
//       totalPoints: totalPoints
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Get requests by status (admin/general)
// const getRequestByStatus = async (req, res) => {
//   const { status } = req.params;

//   try {
//     // --- MODIFIED: Apply populate with correct field names ---
//     const allRequests = await Request.find({ status })
//       .populate('collectionCenter', 'centerName phoneNo')
//       .populate('collectorId', 'fullName phoneNo');

//     res.status(200).json({
//       message: "Requests fetched successfully!",
//       success: true,
//       totalRequests: allRequests.length,
//       Requests: allRequests
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// // Update request status
// const updateRequestStatus = async (req, res) => {
//   const { requestId } = req.params;
//   const { status } = req.body;

//   const validStatuses = ['pending', 'approved', 'rejected', 'collected'];
//   if (!validStatuses.includes(status)) {
//     return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
//   }

//   try {
//     const request = await Request.findById(requestId);
//     if (!request) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     request.status = status;
//     if (status === 'approved') request.approvedAt = new Date();
//     if (status === 'collected') request.completedAt = new Date();

//     await request.save();

//     res.status(200).json({
//       message: "Request status updated successfully",
//       success: true,
//       request
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // Get all requests by center with optional status filter
// const getAllCenterRequests = async (req, res) => {
//   const { centerId } = req.params;
//   const { status } = req.query;

//   try {
//     const center = await Center.findById(centerId);
//     if (!center) {
//       return res.status(404).json({ message: "Center not found!" });
//     }

//     const query = { collectionCenter: centerId };
//     if (status) {
//       query.status = status;
//     }

//     // --- MODIFIED: Apply populate with correct field names ---
//     const requests = await Request.find(query)
//       .populate('homeownerId', 'username')
//       .populate('collectorId', 'fullName phoneNo'); // Corrected to phoneNo

//     res.status(200).json({ requests }); // 🔄 Return the populated requests directly

//   } catch (error) {
//     console.error("Error fetching center requests:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Get basic user info
// const getUserInfo = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.status(200).json({
//       message: "User Info Fetched Successfully!",
//       success: true,
//       user
//     });

//   } catch (error) {
//     console.error("Error fetching user info:", error);
//     res.status(500).json({ message: "Error fetching user info", error });
//   }
// };

// module.exports = {
//   createRequest,
//   assignCollectorToRequest,
//   getAllUserRequests,
//   getUserApprovedRequests,
//   getUserPendingRequests,
//   getUserRejectedRequests,
//   getUserCollectedRequests,
//   getUserApprovedPoints,
//   getRequestByStatus,
//   updateRequestStatus,
//   getAllCenterRequests,
//   getUserInfo
// };


//test for sms
const Request = require('../models/Requests');
const User = require('../models/userModel');
const Center = require('../models/center');
const Collector = require('../models/collector');
const { sendSMS } = require('../services/smsServices');

// Helper function to format phone numbers for Africa's Talking
const formatPhoneNumber = (phoneNo) => {
  // Assuming phoneNo from DB is like 722920813 (without 0 prefix)
  // We need to add '+254' prefix for Kenya
  return `+254${phoneNo}`;
};

// Create new scrap request
const createRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Homeowner user not found" });

    let {
      location,
      pickupDate,
      pickupTime,
      scrapType,
      details,
      weight,
      selectedCollectionCenterName,
      imageUrl
    } = req.body;

    const description = details;
    const center = await Center.findOne({ centerName: selectedCollectionCenterName });
    if (!center) {
      return res.status(404).json({ message: "Selected collection center not found. Please choose an existing one." });
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
      collectionCenter: center._id,
      imageUrl
    });

    await newRequest.save();

    // SMS Notification for Center Admin
    // Assuming center.phoneNo is like 722920813
    const centerPhoneNumber = formatPhoneNumber(center.phoneNo);
    const adminMessage = `Hello,New scrap request from ${user.username} (Phone: ${user.phoneNo}) for ${scrapType} in ${location}. Please check your ScrapConnect dashboard.`;
    await sendSMS(centerPhoneNumber, adminMessage);

    res.status(201).json({
      message: "Scrap request submitted successfully",
      request: newRequest,
      success: true
    });

  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Server error creating request", error: error.message });
  }
};

// Assign collector to request
const assignCollectorToRequest = async (req, res) => {
  const { requestId, collectorId } = req.body;

  try {
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found!" });
    }

    if (request.collectorId) {
      return res.status(400).json({ message: "This request has already been assigned to a collector." });
    }

    const collector = await Collector.findById(collectorId);
    if (!collector) {
      return res.status(404).json({ message: "Collector not found!" });
    }

    if (String(request.collectionCenter) !== String(collector.center)) {
      return res.status(400).json({ message: "Collector does not belong to the collection center the request was made to!" });
    }

    request.collectorId = collectorId;
    request.status = 'approved';
    request.approvedAt = new Date();

    await request.save();

    const populatedRequest = await Request.findById(requestId)
      .populate('collectorId', 'fullName phoneNo')
      .populate('collectionCenter', 'centerName phoneNo')
      .populate('homeownerId', 'username phoneNo'); // Populate homeowner to get their phone number

    // SMS Notification for Collector
    // Assuming populatedRequest.collectorId.phoneNo is like 722920813
    const collectorPhoneNumber = formatPhoneNumber(populatedRequest.collectorId.phoneNo);
    const collectorMessage = `Hello,You have been assigned a new scrap collection request. Please check your ScrapConnect account for details.`;
    await sendSMS(collectorPhoneNumber, collectorMessage);

    // SMS Notification for Homeowner
    // Assuming populatedRequest.homeownerId.phoneNo is like 722920813
    const homeownerPhoneNumber = formatPhoneNumber(populatedRequest.homeownerId.phoneNo);
    const homeownerMessage = `Congratulations,Your scrap collection request (ID: ${requestId.substring(0, 8)}...) has been approved and assigned to a collector. Kindly check your ScrapConnect account for details.`;
    await sendSMS(homeownerPhoneNumber, homeownerMessage);

    res.status(200).json({
      message: "Collector assigned to request successfully!",
      success: true,
      request: populatedRequest
    });

  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

// Get all requests by homeowner
const getAllUserRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const allRequests = await Request.find({ homeownerId: userId })
      .populate('collectionCenter', 'centerName phoneNo')
      .populate('collectorId', 'fullName phoneNo');

    res.status(200).json({
      message: "User Requests fetched successfully!",
      success: true,
      user: user.username,
      totalRequests: allRequests.length,
      requests: allRequests
    });

  } catch (error) {
    console.error("Error fetching user requests:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get approved requests by homeowner
const getUserApprovedRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const allApprovedRequests = await Request.find({ homeownerId: userId, status: "approved" })
      .populate('collectionCenter', 'centerName phoneNo')
      .populate('collectorId', 'fullName phoneNo');

    res.status(200).json({
      message: "User Approved Requests fetched successfully!",
      success: true,
      user: user.username,
      totalRequests: allApprovedRequests.length,
      requests: allApprovedRequests
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get pending requests by homeowner
const getUserPendingRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const allPendingRequests = await Request.find({ homeownerId: userId, status: "pending" })
      .populate('collectionCenter', 'centerName phoneNo')
      .populate('collectorId', 'fullName phoneNo');

    res.status(200).json({
      message: "User Pending Requests fetched successfully!",
      success: true,
      user: user.username,
      totalRequests: allPendingRequests.length,
      requests: allPendingRequests
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get rejected requests by homeowner
const getUserRejectedRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const allRejectedRequests = await Request.find({ homeownerId: userId, status: "rejected" })
      .populate('collectionCenter', 'centerName phoneNo')
      .populate('collectorId', 'fullName phoneNo');

    res.status(200).json({
      message: "User Rejected Requests fetched successfully!",
      success: true,
      user: user.username,
      totalRequests: allRejectedRequests.length,
      requests: allRejectedRequests
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get collected requests
const getUserCollectedRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const allCollectedRequests = await Request.find({ homeownerId: userId, status: "collected" })
      .populate('collectionCenter', 'centerName phoneNo')
      .populate('collectorId', 'fullName phoneNo');

    res.status(200).json({
      message: "User Collected Requests fetched successfully!",
      success: true,
      user: user.username,
      totalRequests: allCollectedRequests.length,
      requests: allCollectedRequests
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get points for approved requests
const getUserApprovedPoints = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const allApprovedRequests = await Request.find({ homeownerId: userId, status: "approved" });
    const totalPoints = allApprovedRequests.length * 10;
    res.status(200).json({
      message: "User Points fetched successfully!",
      success: true,
      user: user.username,
      totalPoints: totalPoints
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get requests by status (admin/general)
const getRequestByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const allRequests = await Request.find({ status })
      .populate('collectionCenter', 'centerName phoneNo')
      .populate('collectorId', 'fullName phoneNo');

    res.status(200).json({
      message: "Requests fetched successfully!",
      success: true,
      totalRequests: allRequests.length,
      Requests: allRequests
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Update request status
const updateRequestStatus = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'approved', 'rejected', 'collected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  try {
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    if (status === 'approved') request.approvedAt = new Date();
    if (status === 'collected') request.completedAt = new Date();

    await request.save();

    res.status(200).json({
      message: "Request status updated successfully",
      success: true,
      request
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all requests by center with optional status filter
const getAllCenterRequests = async (req, res) => {
  const { centerId } = req.params;
  const { status } = req.query;

  try {
    const center = await Center.findById(centerId);
    if (!center) {
      return res.status(404).json({ message: "Center not found!" });
    }

    const query = { collectionCenter: centerId };
    if (status) {
      query.status = status;
    }

    const requests = await Request.find(query)
      .populate('homeownerId', 'username')
      .populate('collectorId', 'fullName phoneNo');

    res.status(200).json({ requests });

  } catch (error) {
    console.error("Error fetching center requests:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get basic user info
const getUserInfo = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User Info Fetched Successfully!",
      success: true,
      user
    });

  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Error fetching user info", error });
  }
};

module.exports = {
  createRequest,
  assignCollectorToRequest,
  getAllUserRequests,
  getUserApprovedRequests,
  getUserPendingRequests,
  getUserRejectedRequests,
  getUserCollectedRequests,
  getUserApprovedPoints,
  getRequestByStatus,
  updateRequestStatus,
  getAllCenterRequests,
  getUserInfo
};