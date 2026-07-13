const express= require('express');
const router=express.Router();
const {loginLimiter}=require('../middleware/rateLimiter');
const { registerValidationRules, loginValidationRules } = require('../middleware/validators');




const {registerUser,logInUser}= require('../controllers/authController');

router.post('/register', registerValidationRules,registerUser);
router.post('/login',loginLimiter, loginValidationRules,logInUser);

module.exports = router;