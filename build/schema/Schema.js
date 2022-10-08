"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class Schema {
    constructor(schemaRules) {
        this.rules = schemaRules(joi_1.default);
    }
    jotJoi() {
        return joi_1.default.object(this.rules);
    }
    validate(data) {
        var _a, _b;
        let validate = this.jotJoi().validate(data, {
            abortEarly: false
        });
        let res = {};
        (_b = (_a = validate === null || validate === void 0 ? void 0 : validate.error) === null || _a === void 0 ? void 0 : _a.details) === null || _b === void 0 ? void 0 : _b.forEach(error => {
            res[error.path[0]] = error.message;
        });
        return res;
    }
}
exports.default = Schema;
