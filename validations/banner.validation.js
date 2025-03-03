import Joi from "joi";

export function bannerValidate(data){
       let Schema = Joi.object({
        name:Joi.string().required(),
        description:Joi.string().required(),
        target:Joi.number().required(),
        userId:Joi.number().optional(),
        categoryId:Joi.number().required(),
        image:Joi.array().required()
       })
       return Schema.validate(data,{abortEarly:false})
}