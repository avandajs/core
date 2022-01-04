import {Model} from "@avanda/orm";
import Locales from "./Locales";

export default interface RuleStruct{
    required?: {
        rule: boolean,
        errorMsg: string  | ((key,val) => string)
    },
    maxLength?: {
        rule: number,
        errorMsg: string | ((key,val) => string)
    },
    minLength?: {
        rule: number,
        errorMsg: string | ((key,val) => string)
    },
    isEmail?: {
        rule: boolean,
        errorMsg: string | ((key,val) => string)
    },
    pattern?: {
        rule: RegExp,
        errorMsg: string | ((key,val) => string)
    },
    isPhone?: {
        rule: Locales | Locales[] | null,
        errorMsg: string | ((key,val) => string)
    },
    array?: {
        rule: boolean,
        errorMsg: string | ((key,val) => string)
    },
    number?: {
        rule: number,
        errorMsg: string | ((key,val) => string)
    },
    object?: {
        rule: boolean,
        errorMsg: string | ((key,val) => string)
    },
    ref?: {
        rule: string,
        errorMsg: string | ((key,val) => string)
    },
    unique?: {
        rule: Model | any,
        errorMsg: string | ((key,val) => string)
    },
    exists?: {
        rule: Model | any,
        errorMsg: string | ((key,val) => string)
    },
    custom?: {
        rule: (val,key) => string | boolean | Promise<string|boolean>,
        errorMsg: string | ((key,val) => string | Promise<string>)
    }
}
