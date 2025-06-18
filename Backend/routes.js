const express=require("express");
const router=express.Router();
const { userSignup } = require('./controllers/userSignup');
const { userSignin, userSignout, getUserInfo } = require("./controllers/userSignin");
const { createPayment } = require("./controllers/paymentController");
const { createRequest } = require('../controllers/requestController');
const CollectionCenter = require('./models/CollectionCentre');
const { verifyToken } = require("./middlewares/verifyToken");



router.post('/user/signup/', userSignup);
router.post('/user/signin/',userSignin);
router.get('/user/info/:userId',getUserInfo)
router.post('/user/signout/',userSignout);
router.post('/payments', verifyToken, createPayment);
router.post('/requests', verifyToken, createRequest);
//  CollectionCenter = require('../models/CollectionCenter');

// GET /api/v1/collection-centers?location=Ruaka
router.get('/', async (req, res) => {
  try {
    const location = req.query.location;
    if (!location) return res.status(400).json({ message: 'Location is required' });

    const centers = await CollectionCenter.find({ location });
    res.json(centers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
