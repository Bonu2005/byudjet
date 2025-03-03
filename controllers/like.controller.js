import client from "../config/db.js"


async function create(req,res) {
    try {
        let data= req.body
        let userId= req.user.id
        let bannerId = data.bannerId
        let find= await client.banner.findFirst({where:{id:bannerId}})
        if(!find){
         return   res.status(404).json({message:"Not found data with this id"})
        }
        let check = await client.like.findFirst({where:{userId,bannerId}})
        if(check){
            return res.status(400).json({ message: "You can like a center only once." });
        }
        let create= await client.like.create({data:{userId,bannerId}})
        res.json(create)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}

async function remove(req,res) {
    let {id}= req.params
    try {
        let find = await client.like.findFirst({where:{id:+id}})
        if(!find){
        return    res.status(400).json({message:"No data with this id"})
        }
        let remove= await client.region.delete({where:{id:+id}})
        res.send(remove)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    
}
export {create,remove}