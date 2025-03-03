import Joi from "joi";

export function categoryValidate(data){
       let Schema = Joi.object({
        name:Joi.string().required(),
       })
       return Schema.validate(data,{abortEarly:false})
}