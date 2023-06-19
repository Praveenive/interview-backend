import express from "express"
import { generateJwtToken, User } from "../Models/users.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.post("/signup", async(req,res)=>{
    try {
       let user = await User.findOne({email:req.body.email})
       if(user)
       {
        return res.status(400).json({message:"Email already Signedup"})
       } 
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password,salt)
       user = await new User({
        name :req.body.name, email : req.body.email,
        contact : req.body.contact,
        password: hashedPassword
       }).save();
       const token = await generateJwtToken(user._id);
      return res.status(202).json({message:"Successfully logged in",token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"server error"})
    }
})

router.post("/login", async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user)
        {
         return res.status(404).json({message:"User not found"})
        }
        console.log(req.body.password,user.password)
   const validatePassword = await bcrypt.compare(
    req.body.password,user.password
   )
   if(!validatePassword)
   {
    return res.status(403).json({message:"Password Mismatch"})
   }
   const token =  generateJwtToken(user._id);
   res.status(201).json({message:"Loggedin success",token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server issuess"})
    }
})
export const userRouter = router; 