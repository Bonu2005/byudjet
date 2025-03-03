import Joi from "joi";

export function likeValidate(data){
       let Schema = Joi.object({
        bannerId:Joi.number().required(),
        userId:Joi.number().optional()
       })
       return Schema.validate(data,{abortEarly:false})
}