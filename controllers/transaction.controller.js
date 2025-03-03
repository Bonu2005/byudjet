import client from "../config/db.js"
import { transactionValidate } from "../validations/transaction.validate.js"

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
        let find = await client.transaction.findMany({ where,
            take: limit,
            skip: offset,
            orderBy})
        res.json(find)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function getOne(req,res) {
    let {id}=req.params
    try {
        
        let find = await client.transAction.findFirst({where:{id:+id}})
        if(!find){
        return    res.status(400).json({message:"No data with this id"})
        }
        res.json(find)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}
async function create(req,res) {
    try {
        let {bannerId,summa}= req.body    
        let user = await client.user.findFirst({where:{id:req.user.id}})
        if(user.balance<summa){
            return res.status(400).json({message:"Your balance is poor for it"})
        }
        if(!summa || summa<=0){
            return res.status(404).json({message:"Summa can not be negative number"})
  
        }
        let find= await client.banner.findFirst({where:{id:bannerId}})
        if(!find){
            return res.status(404).json({message:"Not found banner whith this id"})
        }
        let {error}= transactionValidate({bannerId,summa})
        if(error){
            return res.status(401).json({message:error.message})
        }
       
        let newbalance= find.balance+summa
        let newstatus = newbalance>=find.target?"ACTIVE":find.status 
        await client.banner.update({where:{id:bannerId},data:{balance:{increment:summa},status:newstatus}})
        await client.user.update({
            where: { id: req.user.id },
            data: { balance: { decrement: summa } }
        });
        let create= await client.transaction.create({data:{userId:req.user.id,bannerId,summa}})
        res.json(create)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export {getAll,getOne,create}