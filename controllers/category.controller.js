import client from "../config/db.js"

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
        let find = await client.category.findMany({ where,
            take: limit,
            skip: offset,
            orderBy, })
        res.json(find)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function getOne(req,res) {
    let {id}=req.params
    try {
        
        let find = await client.category.findFirst({where:{id:+id}})
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
        let {name}= req.body
        let create= await client.category.create({data:{name}})
        res.json(create)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}
async function update(req,res) {
    let {id}= req.params
    try {
        let data = req.body
        let find = await client.category.findFirst({where:{id:+id}})
        if(!find){
        return    res.status(400).json({message:"No data with this id"})
        }
        let update = await client.category.update({where:{id:+id},data})
        res.json(update)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}
async function remove(req,res) {
    let {id}= req.params
    try {
        let find = await client.category.findFirst({where:{id:+id}})
        if(!find){
        return    res.status(400).json({message:"No data with this id"})
        }
        let remove= await client.category.delete({where:{id:+id}})
        res.send(remove)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}
export {getAll,getOne,create,update,remove}