"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
/*.extend((joi) => ({
    type: 'string',
    messages:{
      'data.not_exist': '{{#label}} does not exist'
    },
    base: joi.string().required(),
    rules:{
        dataExist:{
            method(model: Model) {
                if (!(model instanceof Model))
                    throw new Error('model must be instance of model')
                return this.$_addRule({ name: 'dataExist', args: { model } });
            },
            async validate(value, helpers, { model }) {
                model = model as Model;
                let check = await model.where({})

                console.log({check})
                if (true) {

                    return value;
                }

                return helpers.error('string.not_exist');
            },
            convert: true
        }
    }
}))*/
// create extended Joi
class Schema {
    constructor(schemaRules) {
        this.rules = schemaRules(joi_1.default);
    }
    jotJoi() {
        return joi_1.default.object(this.rules);
    }
    async validate(data) {
        var _a;
        let res = {};
        let validate = null;
        try {
            let joi = this.jotJoi();
            validate = await joi.validateAsync(data, {
                cache: false,
                abortEarly: true,
                externals: true,
                skipFunctions: false,
                allowUnknown: true
            });
            console.log({ validate });
        }
        catch (error) {
            console.log({ validate });
            console.log({ error });
            (_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a.forEach(error => {
                res[error.path[0]] = error.message;
            });
        }
        return res;
    }
}
exports.default = Schema;
