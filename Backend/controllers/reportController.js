// // controllers/reportController.js
// const Request = require('../models/Requests');
// const Collector = require('../models/collector');
// const jwt=require("jsonwebtoken");

// const getCenterReports = async (req, res) => {
//   try {
//     const { centerId } = req.params;

//     const allRequests = await Request.find({ collectionCenter: centerId }).populate('collectorId');

//     const approved = allRequests.filter(r => r.status === 'approved');
//     const collected = allRequests.filter(r => r.status === 'collected');
//     const rejected = allRequests.filter(r => r.status === 'rejected');
//     const pending = allRequests.filter(r => r.status !== 'approved' && r.status !== 'rejected');
//     const assigned = allRequests.filter(r => r.collectorId);

//     const totalWeight = approved.reduce((sum, req) => sum + (req.weight || 0), 0);

//     const collectorStats = {};
//     for (let req of approved) {
//       if (req.collectorId) {
//         const name = req.collectorId.name;
//         if (!collectorStats[name]) {
//           collectorStats[name] = { requestCount: 0, totalWeight: 0 };
//         }
//         collectorStats[name].requestCount += 1;
//         collectorStats[name].totalWeight += req.weight || 0;
//       }
//     }

//     const collectorPerformance = Object.entries(collectorStats).map(([name, stats]) => ({
//       collectorName: name,
//       ...stats
//     }));

//     res.status(200).json({
//       totalRequests: allRequests.length,
//       approved: approved.length,
//       collected: collected.length,
//       rejected: rejected.length,
//       pending: pending.length,
//       assigned: assigned.length,
//       totalWeight,
//       collectorPerformance
//     });

//   } catch (error) {
//     console.error('Error generating report:', error);
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };


// const getOverallReportSummary = async (req, res) => {
//   try {
//     const allRequests = await Request.find().populate('collectorId');

//     const approved = allRequests.filter(r => r.status === 'approved');
//     const collected = allRequests.filter(r => r.status === 'collected'); 
//     const rejected = allRequests.filter(r => r.status === 'rejected');
//     const pending = allRequests.filter(r => r.status === 'pending');
//     const assigned = allRequests.filter(r => r.collectorId);

//     const totalWeight = collected.reduce((sum, req) => sum + (req.weight || 0), 0);

//     const collectorStats = {};
//     for (let req of collected) {
//       if (req.collectorId) {
//         const name = req.collectorId.fullName; // Use 'fullName' from collector schema
//         if (!collectorStats[name]) {
//           collectorStats[name] = { requestsHandled: 0, weight: 0 };
//         }
//         collectorStats[name].requestsHandled += 1;
//         collectorStats[name].weight += req.weight || 0;
//       }
//     }

//     const collectorPerformance = Object.entries(collectorStats).map(([name, stats]) => ({
//       name,
//       ...stats
//     }));

//     res.status(200).json({
//       summary: {
//         total: allRequests.length,
//         approved: approved.length,
//         collected: collected.length,
//         rejected: rejected.length,
//         pending: pending.length,
//         assigned: assigned.length,
//         totalWeight
//       },
//       collectorStats: collectorPerformance
//     });

//   } catch (err) {
//     console.error("Error in summary report:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };




// const getCenterSummaryReport = async (req, res) => {
//   try {
//     console.log('🔍 === CENTER SUMMARY REPORT DEBUG ===');
    
//     // Step 1: Extract and verify token
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
    
//     console.log('🎫 Token received:', token ? 'YES' : 'NO');
    
//     if (!token) {
//       console.log('❌ No token provided');
//       return res.status(401).json({ message: "No token provided" });
//     }

//     // Step 2: Decode token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('🔓 Decoded token:', decoded);
    
//     const centerId = decoded.id;
//     console.log('🏢 Using centerId:', centerId);
//     console.log('🏢 CenterId type:', typeof centerId);

//     // Step 3: Query all requests for this center
//     console.log('📊 Searching for requests with collectionCenter:', centerId);
    
//     const allRequests = await Request.find({ collectionCenter: centerId })
//       .populate('collectorId')
//       .populate('collectionCenter');
    
//     console.log('📊 Total requests found:', allRequests.length);
    
//     // Debug: Show database stats
//     const totalRequestsInDB = await Request.countDocuments();
//     console.log('🗄️ Total requests in entire database:', totalRequestsInDB);
    
//     if (allRequests.length === 0 && totalRequestsInDB > 0) {
//       console.log('🔍 No requests found for this center. Investigating...');
      
//       // Get all unique collection centers in database
//       const allCenters = await Request.distinct('collectionCenter');
//       console.log('🏢 All collection centers in DB:', allCenters);
//       console.log('🏢 Looking for center:', centerId);
      
//       // Show a sample request
//       const sampleRequest = await Request.findOne().populate('collectionCenter');
//       if (sampleRequest) {
//         console.log('📄 Sample request structure:', {
//           id: sampleRequest._id,
//           collectionCenter: sampleRequest.collectionCenter,
//           collectionCenterType: typeof sampleRequest.collectionCenter,
//           status: sampleRequest.status,
//           weight: sampleRequest.weight
//         });
//       }
//     }

//     // Step 4: Process statistics
//     const approved = allRequests.filter(r => r.status === 'approved');
//     const rejected = allRequests.filter(r => r.status === 'rejected');
//     const pending = allRequests.filter(r => r.status === 'pending');
//     const assigned = allRequests.filter(r => r.collectorId);

//     console.log('📈 Status breakdown:', {
//       total: allRequests.length,
//       approved: approved.length,
//       rejected: rejected.length,
//       pending: pending.length,
//       assigned: assigned.length
//     });

//     const totalWeight = approved.reduce((sum, req) => sum + (req.weight || 0), 0);
//     console.log('⚖️ Total weight:', totalWeight);

//     // Step 5: Process collector statistics
//     const collectorStats = {};
    
//     console.log('👥 Processing collector stats from', approved.length, 'approved requests');
    
//     for (let req of approved) {
//       if (req.collectorId) {
//         const collectorName = req.collectorId.fullName || req.collectorId.name || 'Unknown Collector';
//         console.log('👤 Processing collector:', collectorName, 'Weight:', req.weight);
        
//         if (!collectorStats[collectorName]) {
//           collectorStats[collectorName] = { requestsHandled: 0, weight: 0 };
//         }
//         collectorStats[collectorName].requestsHandled += 1;
//         collectorStats[collectorName].weight += req.weight || 0;
//       }
//     }

//     // Convert to array and sort by requests handled (descending)
//     const collectorPerformance = Object.entries(collectorStats)
//       .map(([name, stats]) => ({
//         name,
//         requestsHandled: stats.requestsHandled,
//         weight: stats.weight
//       }))
//       .sort((a, b) => b.requestsHandled - a.requestsHandled);

//     console.log('👥 Final collector stats:', collectorPerformance);

//     // Step 6: Prepare response
//     const response = {
//       summary: {
//         total: allRequests.length,
//         approved: approved.length,
//         collected: collected.length, // Assuming collected is a valid status
//         rejected: rejected.length,
//         pending: pending.length,
//         assigned: assigned.length,
//         totalWeight: totalWeight
//       },
//       collectorStats: collectorPerformance
//     };

//     console.log('📤 Sending response:', JSON.stringify(response, null, 2));
//     console.log('🔍 === END DEBUG ===');

//     res.status(200).json(response);

//   } catch (error) {
//     console.error('❌ Error in getCenterSummaryReport:', error);
    
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token expired' });
//     }
    
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// };

// module.exports = { getCenterReports,
//   // getOverallReportSummary,
//   getCenterSummaryReport
//  };





const Request = require("../models/Requests");
const jwt = require("jsonwebtoken");

const getCenterReports = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const centerId = decoded.id;

    const requests = await Request.find({ collectionCenter: centerId })
      .populate('collectorId')
      .populate('collectionCenter');

    res.status(200).json({ requests });
  } catch (error) {
    console.error("❌ Error in getCenterReports:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getCenterSummaryReport = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const centerId = decoded.id;

    const allRequests = await Request.find({ collectionCenter: centerId })
      .populate("collectorId")
      .populate("collectionCenter");

    const approved = allRequests.filter(r => r.status === "approved");
    const collected = allRequests.filter(r => r.status === "collected");
    const rejected = allRequests.filter(r => r.status === "rejected");
    const pending = allRequests.filter(r => r.status === "pending");
    const assigned = allRequests.filter(r => r.collectorId);

    const totalWeight = collected.reduce((sum, req) => sum + (req.weight || 0), 0);

    const collectorStats = {};
    for (let req of collected) {
      if (req.collectorId) {
        const name = req.collectorId.fullName || req.collectorId.name || "Unknown Collector";
        if (!collectorStats[name]) {
          collectorStats[name] = { requestsHandled: 0, weight: 0 };
        }
        collectorStats[name].requestsHandled += 1;
        collectorStats[name].weight += req.weight || 0;
      }
    }

    const collectorPerformance = Object.entries(collectorStats)
      .map(([name, stats]) => ({
        name,
        ...stats,
      }))
      .sort((a, b) => b.requestsHandled - a.requestsHandled);

    res.status(200).json({
      summary: {
        total: allRequests.length,
        approved: approved.length,
        collected: collected.length,
        rejected: rejected.length,
        pending: pending.length,
        assigned: assigned.length,
        totalWeight,
      },
      collectorStats: collectorPerformance,
    });
  } catch (error) {
    console.error("❌ Error in getCenterSummaryReport:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getOverallReportSummary = async (req, res) => {
  try {
    const allRequests = await Request.find()
      .populate("collectorId")
      .populate("collectionCenter");

    const approved = allRequests.filter(r => r.status === "approved");
    const collected = allRequests.filter(r => r.status === "collected");
    const rejected = allRequests.filter(r => r.status === "rejected");
    const pending = allRequests.filter(r => r.status === "pending");
    const assigned = allRequests.filter(r => r.collectorId);

    const totalWeight = collected.reduce((sum, req) => sum + (req.weight || 0), 0);

    const collectorStats = {};
    for (let req of collected) {
      if (req.collectorId) {
        const name = req.collectorId.fullName || req.collectorId.name || "Unknown Collector";
        if (!collectorStats[name]) {
          collectorStats[name] = { requestsHandled: 0, weight: 0 };
        }
        collectorStats[name].requestsHandled += 1;
        collectorStats[name].weight += req.weight || 0;
      }
    }

    const collectorPerformance = Object.entries(collectorStats)
      .map(([name, stats]) => ({
        name,
        ...stats,
      }))
      .sort((a, b) => b.requestsHandled - a.requestsHandled);

    res.status(200).json({
      summary: {
        total: allRequests.length,
        approved: approved.length,
        collected: collected.length,
        rejected: rejected.length,
        pending: pending.length,
        assigned: assigned.length,
        totalWeight,
      },
      collectorStats: collectorPerformance,
    });
  } catch (error) {
    console.error("❌ Error in getOverallReportSummary:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getCenterReports,
  getCenterSummaryReport,
  getOverallReportSummary,
};
