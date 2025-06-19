const express=require("express");
const router=express.Router();
const { userSignup } = require('./controllers/userSignup');
const { userSignin, userSignout, getUserInfo } = require("./controllers/userSignin");
const { centerSignup } = require("./controllers/centerSignup");
const { centerSignin, getCenterInfo, centerSignout, getCollectors } = require("./controllers/centerSignin");
const { registerCollector } = require("./controllers/collectorSignup");
const { collectorSignin } = require("./controllers/collectorSignin");





// const { createPayment } = require("./controllers/paymentController");
// const { createRequest } = require('../controllers/requestController');
// const CollectionCenter = require('./models/CollectionCentre');
// const { verifyToken } = require("./middlewares/verifyToken");


// Norma user-homeowner
router.post('/user/signup/', userSignup);
router.post('/user/signin/',userSignin);
router.get('/user/info/:userId',getUserInfo)
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




// router.post('/payments', verifyToken, createPayment);
// router.post('/requests', verifyToken, createRequest);
//  CollectionCenter = require('../models/CollectionCenter');

// GET /api/v1/collection-centers?location=Ruaka
// router.get('/', async (req, res) => {
//   try {
//     const location = req.query.location;
//     if (!location) return res.status(400).json({ message: 'Location is required' });

//     const centers = await CollectionCenter.find({ location });
//     res.json(centers);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

module.exports = router;
