import {config} from "dotenv"
import {runtimeError} from "@avanda/error";

config();

let get = function<Value> (key: string, fallback: Value | null = null): Value {
    let value = process.env[key];
    if (!value && fallback == null)
        throw new runtimeError(`No fallback value specified for ${key} .env property`)
    return (value || fallback) as Value
}
export {
    get
}