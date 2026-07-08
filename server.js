const express=require('express');
require('dotenv').config();
const connectDB=require('./config/db');
const{protect}=require('./middleware/authMiddleware')

connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth',require('./routes/authRoutes'));

app.use('/api/moods',require('./routes/moodRoutes'));

app.use('/api/goals', require('./routes/goalRoutes'));

app.get('/',(req,res)=>{
    res.json({message:'MindSpace API is running'})
});

app.get('/api/auth/profile', protect, (req, res) => {
  res.json(req.user);
});


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})