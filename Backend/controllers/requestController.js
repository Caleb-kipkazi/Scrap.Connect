// const Request = require('../models/Requests');
// const User = require('../models/userModel');
// const Center=require('../models/center');
// const Collector = require('../models/collector');

// const createRequest = async (req, res) => {
//   try {
//     const {userId} = req.params

//     const user = await User.findById(userId);

//     if (!user) return res.status(404).json({ message: "User not found" });

//     let {
//       location,
//       pickupDate,
//       pickupTime,
//       scrapType,
//       description,
//       weight,
//       collectionCenter,
//       imageUrl
//     } = req.body;

//     // Confirm the center exists
//     const center = await Center.findById(collectionCenter);
//     if (!center) {
//       return res.status(404).json({ message: "Collection center not found" });
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
//       collectionCenter:center._id,
//       imageUrl
//     });

//     await newRequest.save();

//     res.status(201).json({
//       message: "Request submitted successfully",
//       request: newRequest,
//       success: true
//     });

//   } catch (error) {
//     console.error("Error creating request:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// // assign collector request
// const assignCollectorToRequest=async(req,res)=>{
//   const {requestId,collectorId}=req.body;

//   try {
    
//     // check if request exists
//     const request=await Request.findById(requestId)
//     if(!request){
//       return res.status(404).json({message:"Request not found!"})
//     }

//     // Prevent assigning if already assigned to a collector
//     if (request.collectorId) {
//       return res.status(400).json({
//         message: "This request has already been assigned to a collector."
//       });
//     }

//     // check if collector exists
//     const collector=await Collector.findById(collectorId)
//     if(!collector){
//       return res.status(404).json({message:"Collector not found!"})
//     }

//     // ensure request and collector belong to the same center
//     if(String(request.collectionCenter) !== String(collector.center)){
//       return res.status(400).json({
//         message:"Collector does not belong to the collection center the request was made to!"
//       });
//     }

//     // assign collector to the request
//     request.collectorId=collectorId;
//     request.status='approved';
//     request.approvedAt=new Date();
    
//     await request.save()

//     const populatedRequest = await Request.findById(requestId)
//     .populate('collectorId')
//     .populate('collectionCenter');

//     res.status(200).json({
//       message:"Collector assigned to request successfully!",
//       success:true,
//       request:populatedRequest
//     });
//   } catch (error) {
//     res.status(500).json({message:"server error",error})
//   }
// }

// // get the all requests made by the homeOwener-normal user
// const getAllUserRequests=async(req,res)=>{
//   const {userId}=req.params;

//   try{
//     // check if user exists
//     const user=await User.findById(userId);
//     if(!user){
//       return res.status(404).json({message:"User not found!"});
//     }

//     // total requests made by the user
//     const allRequests=await Request.find({homeownerId:userId});
//     res.status(200).json({
//       message:"User Requests fetched successfully!",
//       success:true,
//       user:user.username,
//       totalRequests:allRequests.length,
//       requests:allRequests
//     })
//   }catch(error){
//     return res.status(500).json({
//       message:"Internal server error",error
//     })
//   }

// }

// // get all approved requests
// const getUserApprovedRequests=async(req,res)=>{
//   const {userId}=req.params;

//   try {
//     // check if user exists
//     const user=await User.findById(userId);
//     if(!user){
//       return res.status(404).json({message:"User not found!"});
//     }

//     // total requests made by the user
//     const allApprovedRequests=await Request.find({homeownerId:userId ,status:"approved"});
//     res.status(200).json({
//       message:"User Approved Requests fetched successfully!",
//       success:true,
//       user:user.username,
//       totalRequests:allApprovedRequests.length,
//       requests:allApprovedRequests
//     })

//   } catch (error) {
//       return res.status(500).json({
//       message:"Internal server error",error
//     })
//   }
// }

// // get all pending requests
// const getUserPendingRequests=async(req,res)=>{
//   const {userId}=req.params;

//   try {
//     // check if user exists
//     const user=await User.findById(userId);
//     if(!user){
//       return res.status(404).json({message:"User not found!"});
//     }

//     // total requests made by the user
//     const allPendingRequests=await Request.find({homeownerId:userId ,status:"pending"});
//     res.status(200).json({
//       message:"User Pending Requests fetched successfully!",
//       success:true,
//       user:user.username,
//       totalRequests:allPendingRequests.length,
//       requests:allPendingRequests
//     })

//   } catch (error) {
//       return res.status(500).json({
//       message:"Internal server error",error
//     })
//   }
// }

// // get all rejected requests
// const getUserRejectedRequests=async(req,res)=>{
//   const {userId}=req.params;

//   try {
//     // check if user exists
//     const user=await User.findById(userId);
//     if(!user){
//       return res.status(404).json({message:"User not found!"});
//     }

//     // total requests made by the user
//     const allRejectedRequests=await Request.find({homeownerId:userId ,status:"rejected"});
//     res.status(200).json({
//       message:"User Rejected Requests fetched successfully!",
//       success:true,
//       user:user.username,
//       totalRequests:allRejectedRequests.length,
//       requests:allRejectedRequests
//     })

//   } catch (error) {
//       return res.status(500).json({
//       message:"Internal server error",error
//     })
//   }
// }

// //get all collected requests
// const getUserCollectedRequests=async(req,res)=>{
//   const {userId}=req.params;

//   try {
//     // check if user exists
//     const user=await User.findById(userId);
//     if(!user){
//       return res.status(404).json({message:"User not found!"});
//     }

//     // total collected requests made by the user
//     const allCollectedRequests=await Request.find({homeownerId:userId ,status:"collected"});
//     res.status(200).json({
//       message:"User Collected Requests fetched successfully!",
//       success:true,
//       user:user.username,
//       totalRequests:allCollectedRequests.length,
//       requests:allCollectedRequests
//     })

//   } catch (error) {
//       return res.status(500).json({
//       message:"Internal server error",error
//     })
//   }
// }

// // get user's total points for the approved requests
// const getUserApprovedPoints=async(req,res)=>{
//   const {userId}=req.params;

//   try {
//     // check if user exists
//     const user=await User.findById(userId);
//     if(!user){
//       return res.status(404).json({message:"User not found!"});
//     }

//     // total points for the user
//     const allApprovedRequests=await Request.find({homeownerId:userId ,status:"approved"});
//     const totalPoints=allApprovedRequests.length*10
//     res.status(200).json({
//       message:"User Points fetched successfully!",
//       success:true,
//       user:user.username,
//       totalPoints:totalPoints
//     })

//   } catch (error) {
//       return res.status(500).json({
//       message:"Internal server error",error
//     })
//   }
// }

// // all requests by status
// const getRequestByStatus=async(req,res)=>{
//   const {status}=req.params
//   try {

//     const allRequests=await Request.find({status});
//     res.status(200).json({
//       message:"Requests fetched successfully!",
//       success:true,
//       totalRequests:allRequests.length,
//       Requests:allRequests
//     })

//   } catch (error) {
//       return res.status(500).json({
//       message:"Internal server error",error
//     })
//   }
// }


// // update a request

// const updateRequestStatus = async (req, res) => {
//   const { requestId } = req.params;
//   const { status } = req.body;

//   const validStatuses = ['pending', 'approved', 'rejected', 'collected'];
//   if (!validStatuses.includes(status)) {
//     return res.status(400).json({
//       message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
//     });
//   }

//   try {
//     const request = await Request.findById(requestId);
//     if (!request) {
//       return res.status(404).json({ message: "Request not found" });
//     }

//     request.status = status;

//     // Set completion or approval timestamp
//     if (status === 'approved') {
//       request.approvedAt = new Date();
//     }
//     if (status === 'collected') {
//       request.completedAt = new Date();
//     }

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
//   updateRequestStatus
// };

//test
// backend/controllers/requestController.js
const Request = require('../models/Requests'); // Ensure this points to your Request model
const User = require('../models/userModel'); // Assuming 'userModel' is your homeowner user model
const Center = require('../models/center'); // FIX: Ensure Center model is correctly imported and used
const Collector = require('../models/collector');

const createRequest = async (req, res) => {
  try {
    // userId should ideally come from authenticated user (e.g., req.user.id after middleware)
    // For now, if passed in params, we'll use it.
    const { userId } = req.params;

    // Fetch user details to auto-fill fullName and phoneNumber
    const user = await User.findById(userId); // Assuming User model has username and phoneNo
    if (!user) return res.status(404).json({ message: "Homeowner user not found" });

    let {
      location,
      pickupDate,
      pickupTime,
      scrapType,
      details, // Frontend sends 'details', maps to 'description' in model
      weight,
      selectedCollectionCenterName, // Frontend sends the NAME of the center
      imageUrl // This will be a URI string from frontend, backend needs proper file upload for actual files
    } = req.body;

    // Convert 'details' to 'description' to match model schema
    const description = details;

    // FIX: Find the Collection Center using the 'Center' model by its 'centerName'
    const center = await Center.findOne({ centerName: selectedCollectionCenterName });
    if (!center) {
      return res.status(404).json({ message: "Selected collection center not found. Please choose an existing one." });
    }

    const newRequest = new Request({
      homeownerId: userId,
      fullName: user.username, // Auto-fill from authenticated user (assuming username is the full name)
      phoneNumber: user.phoneNo, // Auto-fill from authenticated user
      location,
      pickupDate,
      pickupTime,
      scrapType,
      description, // Using 'description' as per Request model
      weight,
      collectionCenter: center._id, // Store the _id of the found Center model
      imageUrl // For now, stores the URI string. Real upload needs more
    });

    await newRequest.save();

    res.status(201).json({
      message: "Scrap request submitted successfully",
      request: newRequest,
      success: true
    });

  } catch (error) {
    console.error("Error creating request:", error);
    // Add more specific error handling for Mongoose validation or duplicate keys if needed
    res.status(500).json({ message: "Server error creating request", error: error.message });
  }
};

// --- The rest of your requestController.js functions remain the same ---

// get User Info
const getUserInfo = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User Info Fetched Successfully!",
      success: true,
      user
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    return res.status(500).json({ message: "Error fetching user info", error });
  }
};

// assign collector request
const assignCollectorToRequest=async(req,res)=>{
  const {requestId,collectorId}=req.body;

  try {
    const request=await Request.findById(requestId)
    if(!request){
      return res.status(404).json({message:"Request not found!"})
    }

    if (request.collectorId) {
      return res.status(400).json({
        message: "This request has already been assigned to a collector."
      });
    }

    const collector=await Collector.findById(collectorId)
    if(!collector){
      return res.status(404).json({message:"Collector not found!"})
    }

    if(String(request.collectionCenter) !== String(collector.center)){
      return res.status(400).json({
        message:"Collector does not belong to the collection center the request was made to!"
      });
    }

    request.collectorId=collectorId;
    request.status='approved';
    request.approvedAt=new Date();
    
    await request.save()

    const populatedRequest = await Request.findById(requestId)
    .populate('collectorId')
    .populate('collectionCenter');

    res.status(200).json({
      message:"Collector assigned to request successfully!",
      success:true,
      request:populatedRequest
    });
  } catch (error) {
    res.status(500).json({message:"server error",error})
  }
}

// get the all requests made by the homeOwener-normal user
const getAllUserRequests=async(req,res)=>{
  const {userId}=req.params;

  try{
    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({message:"User not found!"});
    }

    const allRequests=await Request.find({homeownerId:userId});
    res.status(200).json({
      message:"User Requests fetched successfully!",
      success:true,
      user:user.username,
      totalRequests:allRequests.length,
      requests:allRequests
    })
  }catch(error){
    return res.status(500).json({
      message:"Internal server error",error
    })
  }
}

// get all approved requests
const getUserApprovedRequests=async(req,res)=>{
  const {userId}=req.params;

  try {
    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({message:"User not found!"});
    }

    const allApprovedRequests=await Request.find({homeownerId:userId ,status:"approved"});
    res.status(200).json({
      message:"User Approved Requests fetched successfully!",
      success:true,
      user:user.username,
      totalRequests:allApprovedRequests.length,
      requests:allApprovedRequests
    })

  } catch (error) {
      return res.status(500).json({
      message:"Internal server error",error
    })
  }
}

// get all pending requests
const getUserPendingRequests=async(req,res)=>{
  const {userId}=req.params;

  try {
    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({message:"User not found!"});
    }

    const allPendingRequests=await Request.find({homeownerId:userId ,status:"pending"});
    res.status(200).json({
      message:"User Pending Requests fetched successfully!",
      success:true,
      user:user.username,
      totalRequests:allPendingRequests.length,
      requests:allPendingRequests
    })

  } catch (error) {
      return res.status(500).json({
      message:"Internal server error",error
    })
  }
}

// get all rejected requests
const getUserRejectedRequests=async(req,res)=>{
  const {userId}=req.params;

  try {
    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({message:"User not found!"});
    }

    const allRejectedRequests=await Request.find({homeownerId:userId ,status:"rejected"});
    res.status(200).json({
      message:"User Rejected Requests fetched successfully!",
      success:true,
      user:user.username,
      totalRequests:allRejectedRequests.length,
      requests:allRejectedRequests
    })

  } catch (error) {
      return res.status(500).json({
      message:"Internal server error",error
    })
  }
}

//get all collected requests
const getUserCollectedRequests=async(req,res)=>{
  const {userId}=req.params;

  try {
    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({message:"User not found!"});
    }

    const allCollectedRequests=await Request.find({homeownerId:userId ,status:"collected"});
    res.status(200).json({
      message:"User Collected Requests fetched successfully!",
      success:true,
      user:user.username,
      totalRequests:allCollectedRequests.length,
      requests:allCollectedRequests
    })

  } catch (error) {
      return res.status(500).json({
      message:"Internal server error",error
    })
  }
}

// get user's total points for the approved requests
const getUserApprovedPoints=async(req,res)=>{
  const {userId}=req.params;

  try {
    const user=await User.findById(userId);
    if(!user){
      return res.status(404).json({message:"User not found!"});
    }

    const allApprovedRequests=await Request.find({homeownerId:userId ,status:"approved"});
    const totalPoints=allApprovedRequests.length*10
    res.status(200).json({
      message:"User Points fetched successfully!",
      success:true,
      user:user.username,
      totalPoints:totalPoints
    })

  } catch (error) {
      return res.status(500).json({
      message:"Internal server error",error
    })
  }
}

// all requests by status
const getRequestByStatus=async(req,res)=>{
  const {status}=req.params
  try {

    const allRequests=await Request.find({status});
    res.status(200).json({
      message:"Requests fetched successfully!",
      success:true,
      totalRequests:allRequests.length,
      Requests:allRequests
    })

  } catch (error) {
      return res.status(500).json({
      message:"Internal server error",error
    })
  }
}


// update a request

const updateRequestStatus = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'approved', 'rejected', 'collected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    });
  }

  try {
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;

    if (status === 'approved') {
      request.approvedAt = new Date();
    }
    if (status === 'collected') {
      request.completedAt = new Date();
    }

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
  getUserInfo
};
