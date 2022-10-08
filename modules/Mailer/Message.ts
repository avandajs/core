type Email = string | {name: string,email: string}
import Mustache from "mustache"
export default class Message<StateStruct> {
    _from: Email
    _to: string
    _subject: string
    _body: string

    isHtml: boolean = false

    constructor(private state:StateStruct | {[k: string]: any}) {}

    from(from: Email){
        this._from = from
        return this;
    }
    to(to: string){
        this._to = to
        return this;
    }
    subject(text: string){
        this._subject = text
        return this;
    }
    textBody(text: string){
        this._body = Mustache.render(text,this.state)
    }
    htmlBody(text: string){
        this.isHtml = true
        this._body = Mustache.render(text,this.state)
    }


}