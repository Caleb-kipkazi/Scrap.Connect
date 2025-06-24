// const express=require("express");
// const router=express.Router();
// const { userSignup } = require('./controllers/userSignup');
// const { userSignin, userSignout, getUserInfo } = require("./controllers/userSignin");
// const { centerSignup } = require("./controllers/centerSignup");
// const { centerSignin, getCenterInfo, centerSignout, getCollectors, getAllCenterRequests } = require("./controllers/centerSignin");
// const { registerCollector } = require("./controllers/collectorSignup");
// const { collectorSignin, getAllCollectorRequests } = require("./controllers/collectorSignin");
// const { requestOTP } = require("./controllers/requestOTP");
// const { resetPassword } = require("./controllers/resetPassword");
// const { 
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
// } = require("./controllers/requestController");





// // const { createPayment } = require("./controllers/paymentController");
// // const { createRequest } = require('../controllers/requestController');
// // const CollectionCenter = require('./models/CollectionCentre');
// // const { verifyToken } = require("./middlewares/verifyToken");


// // Norma user-homeowner
// router.post('/user/signup/', userSignup);
// router.post('/user/signin/',userSignin);
// router.get('/user/info/:userId',getUserInfo)
// router.post('/user/signout/',userSignout);

// // center
// router.get('/center/info/:centerId',getCenterInfo);
// router.get('/center/collectors/:centerId',getCollectors)
// router.post('/center/signup/',centerSignup);
// router.post('/center/signin/',centerSignin);
// router.post('/center/signout/',centerSignout);

// // collector
// router.post('/collector/signup/',registerCollector)
// router.post('/collector/signin/',collectorSignin)

// // otp
// router.post('/auth/requestOTP/',requestOTP)
// router.post('/auth/resetPassword/',resetPassword)

// // requests
// router.get('/requests/center/:centerId/list/',getAllCenterRequests);
// router.get('/requests/user/:userId/list/',getAllUserRequests);
// router.get('/requests/user/:userId/approved/',getUserApprovedRequests);
// router.get('/requests/user/:userId/pending/',getUserPendingRequests);
// router.get('/requests/user/:userId/rejected',getUserRejectedRequests);
// router.get('/requests/user/:userId/collected/',getUserCollectedRequests);
// router.get('/requests/user/:userId/points/',getUserApprovedPoints)
// router.get('/requests/:status/list',getRequestByStatus)
// router.get('/requests/collector/:collectorId/list/',getAllCollectorRequests)

// router.post('/requests/:requestId/update/',updateRequestStatus)
// router.post('/request/assign/',assignCollectorToRequest)
// router.post('/requests/:userId/create/',createRequest);


// // router.post('/payments', verifyToken, createPayment);
// // router.post('/requests', verifyToken, createRequest);
// //  CollectionCenter = require('../models/CollectionCenter');

// // GET /api/v1/collection-centers?location=Ruaka
// // router.get('/', async (req, res) => {
// //   try {
// //     const location = req.query.location;
// //     if (!location) return res.status(400).json({ message: 'Location is required' });

// //     const centers = await CollectionCenter.find({ location });
// //     res.json(centers);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// module.exports = router;

const express=require("express");
const router=express.Router();
const { userSignup } = require('./controllers/userSignup');
const { userSignin, userSignout } = require("./controllers/userSignin");
const { centerSignup } = require("./controllers/centerSignup");
const { centerSignin, getCenterInfo, centerSignout, getCollectors, getAllCenterRequests } = require("./controllers/centerSignin");
const { registerCollector } = require("./controllers/collectorSignup");
const { collectorSignin, getAllCollectorRequests } = require("./controllers/collectorSignin");
const { requestOTP } = require("./controllers/requestOTP");
const { resetPassword } = require("./controllers/resetPassword");
// const { getScrapCenters } = require("./controllers/centerMapController"); // Assuming this is for map functionality, keep commented if not explicitly using this in map
const { getCentersByLocationForHomeowner } = require("./controllers/centerSearchController"); // NEW: Import the new controller for filtering picker

const {
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
  getUserInfo // Moved getUserInfo here as it handles User (homeowner)
} = require("./controllers/requestController");


// Norma user-homeowner
router.post('/user/signup/', userSignup);
router.post('/user/signin/',userSignin);
router.get('/user/info/:userId',getUserInfo) // Use getUserInfo from requestController
router.post('/user/signout/',userSignout);

// center
router.get('/center/info/:centerId',getCenterInfo);
router.get('/center/collectors/:centerId',getCollectors)
router.post('/center/signup/',centerSignup);
router.post('/center/signin/',centerSignin);
router.post('/center/signout/',centerSignout);

// collector
router.post('/collector/signup/',registerCollector)
router.post('/collector/signin/',collectorSignin)

// otp
router.post('/auth/requestOTP/',requestOTP)
router.post('/auth/resetPassword/',resetPassword)

// requests
router.get('/requests/center/:centerId/list/',getAllCenterRequests);
router.get('/requests/user/:userId/list/',getAllUserRequests);
router.get('/requests/user/:userId/approved/',getUserApprovedRequests);
router.get('/requests/user/:userId/pending/',getUserPendingRequests);
router.get('/requests/user/:userId/rejected',getUserRejectedRequests);
router.get('/requests/user/:userId/collected/',getUserCollectedRequests);
router.get('/requests/user/:userId/points/',getUserApprovedPoints)
router.get('/requests/:status/list',getRequestByStatus)
router.get('/requests/collector/:collectorId/list/',getAllCollectorRequests)

router.post('/requests/:requestId/update/',updateRequestStatus)
router.post('/request/assign/',assignCollectorToRequest)
router.post('/requests/:userId/create/',createRequest); // Ensure this route is correct

// Routes for center search by homeowner's location
// router.get('/centers', getScrapCenters); // This route might be for map, keep if needed
router.get('/centers-by-location-for-homeowner', getCentersByLocationForHomeowner); // NEW: For filtering picker


module.exports = router;
