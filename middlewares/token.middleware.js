import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

const verifyToken=(req,res,next)=>{
    let token = req.header("Authorization")
    if(!token){
        return res.status(400).json({message:"Token not found"})
    }
    if(token.startsWith("Bearer ")){
        token = token.split(" ")[1]
    }
    try {
        let data = jwt.verify(token,process.env.JWT_KEY)
        req.user = data    
        next()
    } catch (error) {
        res.status(400).json({message:"Error token"})
    }
}
export default verifyToken