import Joi from "joi";

export function registrValidate(data){
       let Schema = Joi.object({
        fullName:Joi.string().required(),
        phone:Joi.string().required(),
        regionId:Joi.number().required(),
        email:Joi.string().required(),
        password:Joi.string().required(),
        balance:Joi.number().optional(),
        role:Joi.string().optional(),
        photo:Joi.string().required()
       })
       return Schema.validate(data,{abortEarly:false})
}