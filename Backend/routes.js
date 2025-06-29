//routes.js
const express = require("express");
const router = express.Router();
const { userSignup } = require('./controllers/userSignup');
const { userSignin, userSignout } = require("./controllers/userSignin");
const { centerSignup } = require("./controllers/centerSignup");
const { centerSignin, getCenterInfo, centerSignout, getCollectors, getAllCenterRequests } = require("./controllers/centerSignin");
const { registerCollector } = require("./controllers/collectorSignup");
const { collectorSignin, getAllCollectorRequests, getCollectorInfo } = require("./controllers/collectorSignin");

const { requestOTP } = require("./controllers/requestOTP");
const { resetPassword } = require("./controllers/resetPassword");
const { getCentersByLocationForHomeowner } = require("./controllers/centerSearchController");
const { getCenterReports, getOverallReportSummary, getCenterSummaryReport } = require("./controllers/reportController");
const auth = require("./middleware/authMiddleware");
// const feedbackController = require('./controllers/feedbackController');
// const { getFeedbackByCenterId } = require('./controllers/feedbackController');
const {
  submitFeedback,
  getUserCompletedUnreviewedRequest,
  getFeedbackByCenterId
} = require('./controllers/feedbackController');


// Import all request controller functions
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
    getUserInfo
} = require("./controllers/requestController");

// Import payment controller functions (including the new getHomeownerPayments)
const paymentController = require("./controllers/paymentController");


// --- User (Homeowner) Routes ---
router.post('/user/signup/', userSignup);
router.post('/user/signin/', userSignin);
router.get('/user/info/:userId', getUserInfo);
router.post('/user/signout/', userSignout);

// --- Center (Admin) Routes ---
router.get('/center/info/:centerId', getCenterInfo);
router.get('/center/collectors/:centerId', getCollectors);
router.post('/center/signup/', centerSignup);
router.post('/center/signin/', centerSignin);
router.post('/center/signout/', centerSignout);
router.get('/reports/center/:centerId', getCenterReports);
router.get('/report/summary',getCenterSummaryReport);
router.get('/report/center/summary', getCenterSummaryReport); // Assuming this is intentional duplicate or specific context
router.get('/feedback/center/:centerId', getFeedbackByCenterId);

// --- Collector Routes ---
router.post('/collector/signup/', registerCollector);
router.post('/collector/signin/', collectorSignin);
router.get('/requests/collector/:collectorId/list/', getAllCollectorRequests); // Get requests assigned to a specific collector
router.get('/collector/info/:collectorId', getCollectorInfo);


// --- OTP & Password Reset Routes ---
router.post('/auth/requestOTP/', requestOTP);
router.post('/auth/resetPassword/', resetPassword);

// --- Payment Routes ---
router.post('/payment/send', paymentController.payHomeowner); // Use paymentController alias
router.get('/payments/user/:homeownerId/list/', paymentController.getHomeownerPayments); // NEW: Homeowner payment history

// --- Scrap Request Routes ---
router.post('/requests/:userId/create/', createRequest); // Homeowner creates a request

// Center-specific request routes
router.get('/requests/center/:centerId/list/', getAllCenterRequests);

// General request status routes (for broader admin views, if applicable)
router.get('/requests/:status/list', getRequestByStatus);

// Homeowner-specific request routes (All these should be populated now)
router.get('/requests/user/:userId/list/', getAllUserRequests);
router.get('/requests/user/:userId/approved/', getUserApprovedRequests);
router.get('/requests/user/:userId/pending/', getUserPendingRequests);
router.get('/requests/user/:userId/rejected', getUserRejectedRequests);
router.get('/requests/user/:userId/collected/', getUserCollectedRequests);
router.get('/requests/user/:userId/points/', getUserApprovedPoints);

// Request actions
router.post('/requests/:requestId/update/', updateRequestStatus);
router.post('/request/assign/', assignCollectorToRequest);

// --- Center Search for Homeowners (for the request form's location picker) ---
router.get('/centers-by-location-for-homeowner', getCentersByLocationForHomeowner);

//---feedback routes---
// router.post('/feedback/submit', feedbackController.submitFeedback);
// router.get('/feedback/unreviewed/:userId', feedbackController.getUserCompletedUnreviewedRequest);
router.post('/feedback/submit', submitFeedback);
router.get('/feedback/unreviewed/:userId', getUserCompletedUnreviewedRequest);
router.get('/feedback/center/:centerId', getFeedbackByCenterId);


module.exports = router;


// //push test
// const express = require("express");
// const router = express.Router();

// // User / Homeowner
// const { userSignup } = require("./controllers/userSignup");
// const { userSignin, userSignout } = require("./controllers/userSignin");
// const { getUserInfo } = require("./controllers/requestController");

// // Center / Admin
// const { centerSignup } = require("./controllers/centerSignup");
// const {
//   centerSignin,
//   getCenterInfo,
//   centerSignout,
//   getCollectors,
//   getAllCenterRequests,
// } = require("./controllers/centerSignin");

// // Collector
// const { registerCollector } = require("./controllers/collectorSignup");
// const {
//   collectorSignin,
//   getAllCollectorRequests,
// } = require("./controllers/collectorSignin");

// // Authentication & Password Reset
// const { requestOTP } = require("./controllers/requestOTP");
// const { resetPassword } = require("./controllers/resetPassword");

// // Payment (Airtime Simulation)
// const { payHomeowner } = require("./controllers/paymentController");

// // Requests
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
//   updateRequestStatus,
// } = require("./controllers/requestController");

// /** User / Homeowner routes **/
// router.post("/user/signup", userSignup);
// router.post("/user/signin", userSignin);
// router.get("/user/info/:userId", getUserInfo);
// router.post("/user/signout", userSignout);

// /** Center / Admin routes **/
// router.post("/center/signup", centerSignup);
// router.post("/center/signin", centerSignin);
// router.get("/center/info/:centerId", getCenterInfo);
// router.get("/center/collectors/:centerId", getCollectors);
// router.get("/center/requests/:centerId", getAllCenterRequests);
// router.post("/center/signout", centerSignout);

// /** Collector routes **/
// router.post("/collector/signup", registerCollector);
// router.post("/collector/signin", collectorSignin);
// router.get("/collector/requests/:collectorId", getAllCollectorRequests);

// /** OTP & Password Reset **/
// router.post("/auth/requestOTP", requestOTP);
// router.post("/auth/resetPassword", resetPassword);

// /** Payment route **/
// router.post("/payment/send", payHomeowner);

// /** Scrap request routes **/
// router.post("/requests/:userId/create", createRequest);
// router.post("/requests/assign", assignCollectorToRequest);
// router.post("/requests/:requestId/update", updateRequestStatus);
// router.get("/requests/user/:userId/list", getAllUserRequests);
// router.get("/requests/user/:userId/approved", getUserApprovedRequests);
// router.get("/requests/user/:userId/pending", getUserPendingRequests);
// router.get("/requests/user/:userId/rejected", getUserRejectedRequests);
// router.get("/requests/user/:userId/collected", getUserCollectedRequests);
// router.get("/requests/user/:userId/points", getUserApprovedPoints);
// router.get("/requests/status/:status", getRequestByStatus);

// module.exports = router;