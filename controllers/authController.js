const User= require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const registerUser= async (req,res)=>{
    try {
        const {name,email,password}=req.body;

        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'Email alredy registered'})
        }
            const user=await User.create({name,email,password});

            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email
            })

        
    } catch (err) {
        res.status(500).json({message:err.message})
        
    }

};

const logInUser= async (req,res)=>{
    try {
        const{email,password}=req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email and password"
            });
        }

        const isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid email and password"
            })
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token
        })
    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}





module.exports={registerUser,logInUser};