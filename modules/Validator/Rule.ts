import RuleStruct from "./types/RuleStruct";
import {Model} from "@avanda/orm";
import Locales from "./types/Locales";


export default class Rule {
    rules: RuleStruct = {

    }

    prevRule?: string

    constructor() {

    }

    required(){

        this.prevRule = 'required'
        this.rules['required'] = {
            rule: true,
            errorMsg: (key) => `'${key} is required'`
        }
        return this
    }

    email(){
        this.prevRule = 'isEmail'
        this.rules['isEmail'] = {
            rule: true,
            errorMsg: key => `${key} is not a valid email`
        }
        return this
    }
    pattern(regex: RegExp){
        this.prevRule = 'pattern'
        this.rules['pattern'] = {
            rule: regex,
            errorMsg: key => `${key} does not match required pattern`
        }
        return this
    }

    error(msg: string | ((key,val) => string)){
        if (!this.prevRule || !this.rules[this.prevRule])
            throw new Error('Specify rule to attach error to')
        this.rules[this.prevRule].errorMsg = msg
        return this;
    }

    phone(locales: Locales | Locales[]){
        this.prevRule = 'isPhone'
        this.rules['isPhone'] = {
            rule: locales,
            errorMsg: key => `${key} is not a valid phone number`
        }
        return this
    }

    unique(model: Model | any){
        this.prevRule = 'unique'
        this.rules['unique'] = {
            rule: model,
            errorMsg: key => `${key} already exists`
        }
        return this
    }
    exists(model: Model | any){
        this.prevRule = 'exists'
        this.rules['exists'] = {
            rule: model,
            errorMsg: key => `${key} is not recognized`
        }
        return this
    }
    refs(key: string){
        this.prevRule = 'ref'
        this.rules['ref'] = {
            rule: key,
            errorMsg: _key => `${key} must be same as ${_key}`
        }
        return this
    }
    minLength(length: number){
        this.prevRule = 'minLength'
        this.rules['minLength'] = {
            rule: length,
            errorMsg: key => `${key} must be at least ${length} characters`
        }
        return this
    }
    maxLength(length: number){
        this.prevRule = 'maxLength'
        this.rules['maxLength'] = {
            rule: length,
            errorMsg: key => `${key} must be less than ${length} characters`
        }
        return this
    }
    custom(func: (val,key) => string | boolean | (() => any) | Promise<string|boolean|(() => any)>){
        this.prevRule = 'custom'
        this.rules['custom'] = {
            rule: func,
            errorMsg: async (val,key) => await func(val,key) as string
        }
        return this
    }
}