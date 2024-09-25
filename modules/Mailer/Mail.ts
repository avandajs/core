import Message from "./Message";
import nodemailer from "nodemailer"
import {Env} from "../../index";

async function send<StateStruct>(msg: (message: Message<StateStruct | any>) => any,state: StateStruct | any = {}) {
    let message = new Message<StateStruct>(state)
    msg(message)
    // create reusable transporter object using the default SMTP transport

    let secure = Env.get('SMTP_SECURE') == 'true'
    let useAuth = !!Env.get('SMTP_USER', undefined)
    let configs = {
        host: Env.get('SMTP_HOST',undefined),
        port: Env.get('SMTP_PORT', undefined),
        secure, // true for 465, false for other ports
    }
    if (useAuth){
        configs['auth'] = {
            user: Env.get('SMTP_USER', undefined), // generated ethereal user
            pass: Env.get('SMTP_PASS', undefined), // generated ethereal password
        }
    }
    let transporter = nodemailer.createTransport(configs);
//    send mail now
    let toSend = {
        from: typeof message._from == 'string' ? message._from:`"${message._from.name}" <${message._from.email}>`, // sender address
        to: message._to, // list of receivers
        subject: message._subject, // Subject line
        replyTo: message._replyTo
    }

    if (message.isHtml){
        toSend['html'] = message._body
    }else{
        toSend['text'] = message._body
    }
    try {
        return await transporter.sendMail(toSend);
    }catch (e) {
        throw new Error(e.message);
    }

}
interface Template {

}
export {
    send
}