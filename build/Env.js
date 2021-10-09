"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const dotenv_1 = require("dotenv");
const error_1 = require("@avanda/error");
(0, dotenv_1.config)();
let get = function (key, fallback = null) {
    let value = process.env[key];
    if (!value && fallback == null)
        throw new error_1.runtimeError(`No fallback value specified for ${key} .env property`);
    return (value || fallback);
};
exports.get = get;
