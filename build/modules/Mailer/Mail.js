"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const Message_1 = __importDefault(require("./Message"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const index_1 = require("../../index");
async function send(msg, state = {}) {
    let message = new Message_1.default(state);
    msg(message);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer_1.default.createTransport({
        host: index_1.Env.get('SMTP_HOST', undefined),
        port: index_1.Env.get('SMTP_PORT', undefined),
        secure: index_1.Env.get('SMTP_SECURE') == 'true',
        auth: {
            user: index_1.Env.get('SMTP_USER', undefined),
            pass: index_1.Env.get('SMTP_PASS', undefined), // generated ethereal password
        },
    });
    //    send mail now
    let toSend = {
        from: typeof message._from == 'string' ? message._from : `"${message._from.name}" <${message._from.email}>`,
        to: message._to,
        subject: message._subject, // Subject line
    };
    if (message.isHtml) {
        toSend['html'] = message._body;
    }
    else {
        toSend['text'] = message._body;
    }
    try {
        return await transporter.sendMail(toSend);
    }
    catch (e) {
        console.log({ mailerError: e });
        throw new Error(e.message);
        return false;
    }
}
exports.send = send;
