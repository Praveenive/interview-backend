import express from "express"
import { generateJwtToken, User } from "../Models/users.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.post("/signup", async(req,res)=>{
    try {
       let user = await User.findOne({email:req.body.email})
       if(user)
       {
        return res.status(400).json({data:"Email already Signedup"})
       } 
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password,salt)
       user = await new User({
        name :req.body.name, email : req.body.email,
        contact : req.body.contact,
        password: hashedPassword
       }).save();
       const token = await generateJwtToken(user._id);
      return res.status(202).json({data:"Successfully logged in",token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({data:"server error"})
    }
})

router.post("/login", async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user)
        {
          res.status(400).json({data:"User not found"})
        }
   const validatePassword = await bcrypt.compare(
    req.body.password,user.password
   )
   if(!validatePassword)
   {
    res.status(404).json({message:"Password Mismatch"})
   }
   const token =  generateJwtToken(user._id);
   res.status(201).json({data:"Loggedin success",token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({data:"Server issuess"})
    }
})
export const userRouter = router; 