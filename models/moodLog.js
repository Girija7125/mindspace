const mongoose= require('mongoose');

const moodLogSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    mood:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    note:{
        type:String,
        trim:true,
        default:''
    },
    activities:{
        type:[String],
        default:[]
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    }
},{timestamps:true})

module.exports=mongoose.model('MoodLog',moodLogSchema);