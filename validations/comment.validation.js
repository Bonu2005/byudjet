import Joi from "joi";

export function commentValidate(data){
       let Schema = Joi.object({
        msg_txt:Joi.string().required(),
        userId:Joi.number().optional(),
        bannerId:Joi.number().required()
       })
       return Schema.validate(data,{abortEarly:false})
}