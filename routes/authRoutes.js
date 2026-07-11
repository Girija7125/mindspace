const express= require('express');
const router=express.Router();
const {loginLimiter}=require('../middleware/rateLimiter')



const {registerUser,logInUser}= require('../controllers/authController');

router.post('/register',registerUser);
router.post('/login',loginLimiter,logInUser);

module.exports = router;