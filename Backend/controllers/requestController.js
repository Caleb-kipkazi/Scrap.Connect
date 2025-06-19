const Request = require('../models/Requests');
const User = require('../models/userModel');
const Center=require('../models/center');
const Collector = require('../models/collector');

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

// assign collector request
const assignCollectorToRequest=async(req,res)=>{
  const {requestId,collectorId}=req.body;

  try {
    
    // check if request exists
    const request=await Request.findById(requestId)
    if(!request){
      return res.status(404).json({message:"Request not found!"})
    }

    // Prevent assigning if already assigned to a collector
    if (request.collectorId) {
      return res.status(400).json({
        message: "This request has already been assigned to a collector."
      });
    }

    // check if collector exists
    const collector=await Collector.findById(collectorId)
    if(!collector){
      return res.status(404).json({message:"Collector not found!"})
    }

    // ensure request and collector belong to the same center
    if(String(request.collectionCenter) !== String(collector.center)){
      return res.status(400).json({
        message:"Collector does not belong to the collection center the request was made to!"
      });
    }

    // assign collector to the request
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

module.exports = { 
  createRequest,
  assignCollectorToRequest
};
