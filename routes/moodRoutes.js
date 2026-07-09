const express = require('express');
const router = express.Router();
const{createMoodLog, getMoodLog,updateMoodLog,deleteMoodLog }=require('../controllers/moodController');
const{protect}=require('../middleware/authMiddleware');

router.post('/',protect,createMoodLog );
router.get('/',protect,getMoodLog);
router.put('/:id', protect, updateMoodLog);
router.delete('/:id', protect, deleteMoodLog);

module.exports = router;