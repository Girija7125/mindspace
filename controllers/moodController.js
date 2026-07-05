const MoodLog = require('../models/moodLog');

const createMoodLog = async (req, res) => {
    try {
        const { mood, note, activities, date } = req.body;

        const moodLog = await MoodLog.create({
            user: req.user._id,
            mood,
            note,
            activities,
            date
        })

        res.status(201).json(moodLog)
    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Invalid mood log data' });
        }
        res.status(500).json({ message: 'Something went wrong, please try again'})
    }
}

const getMoodLog = async (req,res)=>{
    try {
        const moodLogs = await MoodLog.find({ user: req.user._id }).sort({ date: -1 });
        res.status(200).json(moodLogs)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}


module.exports={createMoodLog,getMoodLog}