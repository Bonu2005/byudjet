import client from "../config/db.js"
import { transport } from "../config/nodemailer.js"
import { config } from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
config()
import { isGmail, isPhone } from "../validations/email&phone.validation.js"
import otp from "otplib"
import { registrValidate } from "../validations/registrValidation.js"
otp.totp.options = { step: 500, digits: 5 };
async function getAll(req,res) {
    try {
        let { page = 1, pageSize = 10, sortBy = "name", sortOrder = "desc", ...filter } = req.query;
        const limit = parseInt(pageSize);
        const offset = (page - 1) * limit;
        const orderBy = { [sortBy]: sortOrder };
        const where = {};
        Object.keys(filter).forEach((key) => {
            where[key] = { contains: filter[key], mode: "insensitive" };
        });
        let find = await client.user.findMany({ where,
            take: limit,
            skip: offset,
            orderBy})
        res.json(find)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function getOne(req,res) {
    try {
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function sendOtp(req,res) {
    try {
        let {email}=req.body
        if(!isGmail(email)){
            return res.status(400).json({message:"The email you entered is in an incorrect format"})
        }
        let data = await client.user.findFirst({where:{email}})
        if(data){
            return res.status(409).json({message:"This email is already registered"})
        }
        let otp1 = otp.totp.generate(`${process.env.OTP_KEY}_${email}`)
        console.log(otp1);
        await transport.sendMail({
        from:"<booonu@icloud.com>",
        to:email,
        subject:"Hii good man  activate your account if it's you ,if no, ignore this message 😊",
        html: `<h3>Your otp code: ${otp1}</h3>`,
       })   
        res.status(200).send({success:"We have sent a verification code to your email address. Please verify it!"});
    } catch (error) {
        res.status(400).json({message:error.message}) 
    }
    
}
async function veerifyOtp(req,res){
    try {
        let {email,otp1}=req.body
        console.log(email);
        
        let check = otp.totp.check(otp1,`${process.env.OTP_KEY}_${email}`)
        if(!check){
          return  res.status(400).json("Oooopss... Wrong Otp")
        }
        res.json("Verifiyed succesfully")
        await client.tempModel.create({data:{email}})
    } catch (error) {
        res.status(400).json({message:error.message}) 
    }
    
}
async function registr(req,res) {
    try {
       let data = req.body
       let s = await client.region.findMany({where:{id:data.regionId}})
       if(!s.length){
        return res.status(400).json({message:"We dont have data with this regionId"})
       }
       
       let {error,value}=registrValidate(data)
       
       if(error){
        return res.status(400).json({message:error.message})
       }
       if(data.role=="ADMIN" || data.role!="USER"){
        return res.status(400).json({message:"you can not sign in like ADMIN or Someone else except USER"})
       }
       let {phone,email,password}=value
       if(!isGmail(email)){
        return res.status(400).json({error:"The email you entered is in an incorrect format"});
       }
      let check = await client.tempModel.findFirst({where:{email:value.email}})
      if(!check){
        return res.status(400).json({message:"This email is not activated"})
      }
      let nphone= isPhone(phone)
      if(!nphone){
        return res.status(400).json({error:"Example for phone: 998567345634"});
      }
       let hash = bcrypt.hashSync(password,10)
       let reg= await client.user.create({data:{...value,password:hash},select:{id:true,fullName:true,phone:true,region:{select:{id:true,name:true}},balance:true,role:true,photo:true}})   
       let token =jwt.sign({id:reg.id,regionId:value.regionId,role:value.role},process.env.JWT_KEY)
       res.json({"your_token":token,data:{reg}})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function login(req,res) {
    try {
        let {email,password}=req.body
        let find = await client.user.findFirst({where:{email}})
        if(!find){
            return res.status(404).json({message:"Not found user,email or password is wrong"}); 
        }
        let check =bcrypt.compareSync(password,find.password)
        if(!check){
            return res.status(401).send({message:"email or password is wrong"});
        }
        let token =jwt.sign({id:find.id,regionId:find.regionId,role:find.role},process.env.JWT_KEY)
        res.json({"your_token":token})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function update(req,res) {
    let {id}=req.params
    try {
        let data = req.body
        let check = await client.user.findFirst({where:{id:+id}})
        if(!check){
            return  res.status(401).json({message:"not found this kind data whith this id"})
        }
        if(data.role){
        return  res.status(401).json({message:"You can not change role"})
        }
        if(id!=req.user.id){
         return  res.status(401).json({message:"You can not change others account"})
        }
        let update= await client.user.update({where:{id:+id},data})
        res.json(update)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function remove(req,res) {
    let {id}= req.params
    try {
        let check = await client.user.findFirst({where:{id:+id}})
        if(!check){
            return  res.status(401).json({message:"not found this kind data whith this id"})
        }
        let remove = await client.user.delete({where:{id:+id}})
        res.json(remove)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function createAdmin(req,res) {
    try {
       let data = req.body
       let {error,value}=registrValidate(data)
       if(error){
        return res.status(400).json({message:error.message})
       }
       let s = await client.region.findMany({where:{id:data.regionId}})   
       if(!s.length){
        return res.status(400).json({message:"We dont have data with this regionId"})
       }
      
       
       if(data.role!="ADMIN" && data.role!="USER"){
        return res.status(400).json({message:"Type of role only USER and ADMIN"})
       }
       let {phone,email,password}=value
       if(!isGmail(email)){
        return res.status(400).json({error:"The email you entered is in an incorrect format"});
       }
      let check = await client.tempModel.findFirst({where:{email:value.email}})
      if(!check){
        return res.status(400).json({message:"This email is not activated"})
      }
      let nphone= isPhone(phone)
      if(!nphone){
        return res.status(400).json({error:"Example for phone: 998567345634"});
      }
       let hash = bcrypt.hashSync(password,10)
       let reg= await client.user.create({data:{...value,password:hash},select:{fullName:true,phone:true,region:{select:{id:true,name:true}},balance:true,role:true,photo:true}})
    
       
       let token =jwt.sign({id:value.id,regionId:value.regionId,role:value.role},process.env.JWT_KEY)
      
       res.json({"your_token":token,data:{reg}})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export {sendOtp,veerifyOtp,registr,login,update,remove,getAll,getOne,createAdmin}