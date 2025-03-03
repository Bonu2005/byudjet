export function selfPolice(roles){
    return(req,res,next)=>{
        let {id,role}=req.user
         
        if(id==req.params.id && roles.includes(role)){
           next() 
        }
        else{
            res.status(401).json({message:"Not allowed"})  
        }
    }
}