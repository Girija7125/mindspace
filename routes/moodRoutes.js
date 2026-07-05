const express = require('express');
const router = express.Router();
const{createMoodLog, getMoodLog }=require('../controllers/moodController');
const{protect}=require('../middleware/authMiddleware');

router.post('/',protect,createMoodLog );
router.get('/',protect,getMoodLog)

module.exports = router;