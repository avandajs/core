"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsSender = exports.SmsDriver = void 0;
const Message_1 = __importDefault(require("./Message"));
const SmsDriver_1 = __importDefault(require("./types/SmsDriver"));
exports.SmsDriver = SmsDriver_1.default;
class SmsSender {
    static setSmsDriver(driver) {
        SmsSender.smsDriver = driver;
    }
    static async send(msg, state = {}) {
        var _a;
        let message = new Message_1.default(state);
        //this will mutate the message variable
        msg(message);
        // create reusable transporter object using the default SMTP transport
        //    send mail now
        let toSend = {
            to: message._to,
            from: message._from,
            body: message._body, // Subject line
        };
        try {
            if (!SmsSender.smsDriver) {
                throw new Error("No SMS Driver found");
            }
            await ((_a = SmsSender.smsDriver) === null || _a === void 0 ? void 0 : _a.send(toSend));
            // return await transporter.sendMail(toSend);
        }
        catch (e) {
            throw new Error(e.message);
            return false;
        }
    }
}
exports.SmsSender = SmsSender;
