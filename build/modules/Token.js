"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.generate = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const index_1 = require("../index");
let generate = async function (payload, expiresIn = null) {
    return new Promise((resolve, reject) => {
        let jwt_key = index_1.Env.get('JWT_KEY', null);
        let jwt_expiry = expiresIn !== null && expiresIn !== void 0 ? expiresIn : index_1.Env.get('JWT_KEY_EXPIRES_IN', null);
        if (!jwt_key) {
            reject('Specify JWT_KEY in .env file ');
            return;
        }
        jwt.sign(payload, jwt_key, {
            expiresIn: jwt_expiry,
            algorithm: index_1.Env.get('JWT_ALGORITHM', 'HS256')
        }, (err, encoded) => {
            if (err) {
                reject(err.message);
                return;
            }
            resolve(encoded);
        });
    });
};
exports.generate = generate;
let decode = async function (token) {
    let jwt_key = index_1.Env.get('JWT_KEY', null);
    return new Promise((resolve, reject) => {
        if (!jwt_key) {
            reject('Specify JWT_KEY in .env file ');
            return;
        }
        jwt.verify(token, jwt_key, function (err, decoded) {
            if (err) {
                reject(err);
                return;
            }
            resolve(decoded);
        });
    });
};
exports.decode = decode;
