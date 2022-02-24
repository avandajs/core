import Message from "./Message";
import {Env} from "../../index";
import SmsDriver from "./types/SmsDriver"
import Msg from "./types/Msg"

class SmsSender {

    static smsDriver?: SmsDriver;

    static setSmsDriver(driver: SmsDriver){
        SmsSender.smsDriver = driver;
    }

    static async send<StateStruct>(msg: (message: Message<StateStruct | any>) => any,state: StateStruct | any = {}) {
        let message = new Message<StateStruct>(state)
        //this will mutate the message variable
        msg(message)
        // create reusable transporter object using the default SMTP transport


//    send mail now
        let toSend: Msg = {
            to: message._to, // list of receivers
            from: message._from, // list of receivers
            body: message._body, // Subject line
        }

        try {
            if (!SmsSender.smsDriver){
                throw new Error("No SMS Driver found");
            }

            await SmsSender.smsDriver?.send(toSend)
            // return await transporter.sendMail(toSend);
        }catch (e) {
            throw new Error(e.message);
            return false
        }

    }
}

export {SmsDriver,SmsSender}

