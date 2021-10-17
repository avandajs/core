import Joi from "joi"

type Rules = {
    [key: string]: Joi.AnySchema
}

type Data<T> = {
    [key: string]: T
}

export default class Schema{
    private readonly rules: Rules
    constructor(schemaRules: (schema: Joi.Root) => Rules) {
        this.rules = schemaRules(Joi)
    }

    private jotJoi(){
        return Joi.object(this.rules)
    }

    validate(data: Data<any>){

        let validate = this.jotJoi().validate(data,{
            abortEarly: false
        })
        let res:Data<string> = {}

        validate?.error?.details?.forEach(error => {
            res[error.path[0]] = error.message
        });

        return res

    }
}