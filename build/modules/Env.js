"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const dotenv_1 = require("dotenv");
const error_1 = require("@avanda/error");
let t = __dirname.split(/node_modules|core\/app/);
let ROOT_DIR = t[0];
(0, dotenv_1.config)({
    path: ROOT_DIR + '.env'
});
let get = function (key, fallback = null) {
    let value = process.env[key];
    if (!value && fallback == null)
        throw new error_1.runtimeError(`No fallback value specified for ${key} .env property`);
    return (value || fallback);
};
exports.get = get;
