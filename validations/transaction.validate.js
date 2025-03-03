import Joi from "joi";

export function transactionValidate(data){
       let Schema = Joi.object({
        userId:Joi.number().optional(),
        bannerId:Joi.number().required(),
        summa:Joi.number().required()
       })
       return Schema.validate(data,{abortEarly:false})
}