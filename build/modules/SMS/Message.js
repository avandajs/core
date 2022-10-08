"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mustache_1 = __importDefault(require("mustache"));
class Message {
    constructor(state) {
        this.state = state;
    }
    to(to) {
        this._to = to;
        return this;
    }
    from(from) {
        this._from = from;
        return this;
    }
    body(text) {
        this._body = mustache_1.default.render(text, this.state);
    }
}
exports.default = Message;
