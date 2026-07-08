const Goal= require('../models/Goal');
const { findById } = require('../models/moodLog');


const createGoal = async (req,res)=>{
    try {
        const{title,description,freqency,targetDate}=req.body;

        const goal = await Goal.create({
            user:req.user._id,
            title,
            description,
            freqency,
            targetDate
        });
        res.status(201).json(goal)
    } catch (error) {
        console.error(error);
        if(error.name ==='Validation Error'){
            return res.status(400).json({message:'Invalid Goal Data'})
        }
        res.status(500).json({message:'Something Went Wrong please try again'})
    }
}

const getGoals= async (req,res)=>{
    try {
        const goals =await Goal.find({user:req.user._id}).sort({createdAt:-1});
        res.status(200).json(goals)
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Something went wrong Please try again'})
    }
}

const updateGoal = async (req,res)=>{
    try {
        const goal = await Goal.findById(req.params.id);

        if(!goal){
            return res.status(404).json({message:'Goal is not found'})
        }
        if(goal.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message:'Not authorized to update this goal'})
        }
        const updatedGoal= await Goal.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error(error);
        if(error.name ==='ValidationError'){
            return res.status(400).json({message:'Invalid goal data'});
        }
        return res.status(500).json({message:'Something went wrong please try again'});
    }
}

const deleteGoal = async (req,res)=>{
    try {
        const goal = await Goal.findById(req.params.id);

        if(!goal){
            return res.status(404).json({message:'Goal not found'})
        }
        if(goal.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message:'Not authorized to delete this goal'})
        }
        await goal.deleteOne();
        res.status(200).json({message:'Goal deleted successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Something went wrong , please try again'})
    }
}



module.exports = {createGoal,getGoals,updateGoal,deleteGoal}