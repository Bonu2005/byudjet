import client from "../config/db.js"
import { bannerValidate } from "../validations/banner.validation.js"

async function getAll(req, res) {
    try {
        let { page = 1, pageSize = 10, sortBy = "name", sortOrder = "desc", ...filter } = req.query;
        const limit = parseInt(pageSize);
        const offset = (page - 1) * limit;
        const orderBy = { [sortBy]: sortOrder };
        const where = {};
        Object.keys(filter).forEach((key) => {
            where[key] = { contains: filter[key], mode: "insensitive" };
        });
        let find = await client.banner.findMany({
            where,
            take: limit,
            skip: offset,
            orderBy, 
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        phone: true,
                        region: {
                            select: { id: true, name: true }
                        }
                    }
                }
            }
        });

        res.json(find);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function getOne(req,res) {
    let {id}=req.params
    try {
       
        let find = await client.banner.findFirst({where:{id:+id}, include: {
            user: {
                select: {
                    id: true,   
                    fullName: true,
                    phone: true,
                    region: {
                        select: { id: true, name: true }
                    }
                }
            }
        }}) 
        let like = await client.like.findMany({where:{bannerId:find.id}})   
        if(!find){
        return    res.status(400).json({message:"No data with this id"})
        }
        res.json({find,like_count:like.length})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}
async function create(req,res) {
    try {
        let {name,description,target,image,categoryId,regions}= req.body
        console.log(req.user);
        
        let find= await client.category.findFirst({where:{id:categoryId}})
        let {error}= bannerValidate({name,description,target,image,categoryId})
        if(error){
            return res.status(401).json({message:error.message})
        }
        if(!find){
            return res.status(404).json({message:"Not found category whith this id"})   
        }
        let create= await client.banner.create({data:{name,description,target,image,categoryId,userId:req.user.id}})  
        await Promise.all(regions.map(regionId => 
            client.bannerItem.create({ data: { bannerId: create.id, regionId } })
        ));
        res.json(create)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function update(req,res) {
    let {id}= req.params
    try {
        let data = req.body
        let find = await client.banner.findFirst({where:{id:+id}})
        if(!find){
        return    res.status(400).json({message:"No data with this id"})
        }
        let update = await client.banner.update({where:{id:+id},data})
        res.json(update)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}
async function remove(req,res) {
    let {id}= req.params
    try {
        let find = await client.banner.findFirst({where:{id:+id}})
        if(!find){
        return    res.status(400).json({message:"No data with this id"})
        }
        let remove= await client.banner.delete({where:{id:+id}})
        res.send(remove)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}
export {getAll,getOne,create,update,remove}