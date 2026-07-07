const MoodLog = require('../models/moodLog');
const User = require('../models/User');
const { isSameDay, daysBetween } = require('../utils/dateHelpers')

const createMoodLog = async (req, res) => {
    try {
        const { mood, note, activities, date } = req.body;

        const moodLog = await MoodLog.create({
            user: req.user._id,
            mood,
            note,
            activities,
            date
        });

        const user = await User.findById(req.user._id);
        const today = new Date();

        if (!user.lastLogDate) {
            user.currentStreak = 1;
        } else if (isSameDay(user.lastLogDate, today)) {

        } else if (daysBetween(user.lastLogDate, today) === 1) {
            user.currentStreak += 1
        } else {
            user.currentStreak = 1;
        }

        if (user.currentStreak > user.longestStreak) {
            user.longestStreak = user.currentStreak;
        }

        user.lastLogDate = today;
        await user.save()
        res.status(201).json(moodLog)







    } catch (error) {
        console.error(error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Invalid mood log data' });
        }
        res.status(500).json({ message: 'Something went wrong, please try again' })
    }
}

const getMoodLog = async (req, res) => {
    try {
        const moodLogs = await MoodLog.find({ user: req.user._id }).sort({ date: -1 });
        res.status(200).json(moodLogs)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong, please try again' });
    }
}


module.exports = { createMoodLog, getMoodLog }