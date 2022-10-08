import {Model} from "@avanda/orm";
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
import Rule from "./Rule";
import Datum from "./types/Datum";

export default class Schema{

    constructor(private readonly schema: {[k: string]: Rule}) {}

    public async validate(data: Datum<any>): Promise<Datum<string>>{
        let errors: Datum<string> = {}

        const checkers = {
            isEmail: (value) => value && isEmail(value),
            required: (value) => typeof value != 'undefined' && value.trim().length > 0,
            minLength: (value,length) => typeof value != 'undefined' && value.trim().length >= length,
            maxLength: (value,length) => typeof value != 'undefined' && value.trim().length <= length,
            isPhone: (value,locale)  => value &&  isMobilePhone(value,locale),
            unique: async (value,model: Model,key) => !await model.where({[key]: value}).first(),
            exists: async (value,model: Model,key) => !!await model.where({[key]: value}).first(),
            custom: async (value,func: (val) => Promise<string|boolean>,key) => {
                return await func(value);
            },
            pattern: async (value,pattern: RegExp) => pattern.test(value),
            ref: async (value,key) => value === data[key],
        }

        for (let prop in this.schema){
            let schema = this.schema[prop];
            let value = data[prop]
            for (let rulesKey in schema.rules){
                let rule = schema.rules[rulesKey]
                let check = await checkers[rulesKey](value,rule.rule,prop);
                // console.log({})
                if (!check || typeof check == 'string'){
                    let errMsg = typeof check == 'string' ? check : rule.errorMsg
                    errors[prop] = typeof errMsg == 'function' ? errMsg(prop,value) : errMsg
                    // console.log({errorToPush: errors[prop],check,value})
                    break;
                } else if(typeof check == 'function'){
                    value = check();
                }
            }
        }

        // console.log({errors})
        return errors;

    }
}