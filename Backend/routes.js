const express=require("express");
const router=express.Router();
const { userSignup } = require('./controllers/userSignup');
const { userSignin, userSignout, getUserInfo } = require("./controllers/userSignin");


router.post('/user/signup/', userSignup);
router.post('/user/signin/',userSignin);
router.get('/user/info/:userId',getUserInfo)
router.post('/user/signout/',userSignout);

module.exports = router;
