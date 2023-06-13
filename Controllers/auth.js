import jwt from "jsonwebtoken"
import { User } from "../Models/users.js";

const isAuthenicated = async(req,res,next)=>{
let token;
if(req.headers){
    try {
        token = await req.headers["x-auth-token"];
        const decode = jwt.verify(token,process.env.SECRET_KEY)
        console.log("DEcode:",decode)
        req.user = await User.findById(decode.id).select("_id,name,email")
        console.log(req.user)
        next()
    
} catch (error) {
    console.log(error);
   return res.status(500).json({data:"Invalid authenication"})
}
}
if(!token){
    return res.status(400).json({data:"Access denied"})
}

}
export { isAuthenicated }