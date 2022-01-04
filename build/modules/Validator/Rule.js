"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rule {
    constructor() {
        this.rules = {};
    }
    required() {
        this.prevRule = 'required';
        this.rules['required'] = {
            rule: true,
            errorMsg: (key) => `'${key} is required'`
        };
        return this;
    }
    email() {
        this.prevRule = 'isEmail';
        this.rules['isEmail'] = {
            rule: true,
            errorMsg: key => `${key} is not a valid email`
        };
        return this;
    }
    pattern(regex) {
        this.prevRule = 'pattern';
        this.rules['pattern'] = {
            rule: regex,
            errorMsg: key => `${key} does not match required pattern`
        };
        return this;
    }
    error(msg) {
        if (!this.prevRule || !this.rules[this.prevRule])
            throw new Error('Specify rule to attach error to');
        this.rules[this.prevRule].errorMsg = msg;
        return this;
    }
    phone(locales) {
        this.prevRule = 'isPhone';
        this.rules['isPhone'] = {
            rule: locales,
            errorMsg: key => `${key} is not a valid phone number`
        };
        return this;
    }
    unique(model) {
        this.prevRule = 'unique';
        this.rules['unique'] = {
            rule: model,
            errorMsg: key => `${key} already exists`
        };
        return this;
    }
    exists(model) {
        this.prevRule = 'exists';
        this.rules['exists'] = {
            rule: model,
            errorMsg: key => `${key} is not recognized`
        };
        return this;
    }
    refs(key) {
        this.prevRule = 'ref';
        this.rules['ref'] = {
            rule: key,
            errorMsg: _key => `${key} must be same as ${_key}`
        };
        return this;
    }
    minLength(length) {
        this.prevRule = 'minLength';
        this.rules['minLength'] = {
            rule: length,
            errorMsg: key => `${key} must be at least ${length} characters`
        };
        return this;
    }
    maxLength(length) {
        this.prevRule = 'maxLength';
        this.rules['maxLength'] = {
            rule: length,
            errorMsg: key => `${key} must be less than ${length} characters`
        };
        return this;
    }
    custom(func) {
        this.prevRule = 'custom';
        this.rules['custom'] = {
            rule: func,
            errorMsg: async (val, key) => await func(val, key)
        };
        return this;
    }
}
exports.default = Rule;
