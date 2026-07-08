const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true,
        default:''
    },
    freqency:{
        type:String,
        enum:['daily','weekly','once'],
        default:'daily'
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    targetDate:{
        type:Date
    }
},{timestamps:true});

module.exports = mongoose.model('Goal',goalSchema)