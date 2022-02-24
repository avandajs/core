import Mustache from "mustache"
export default class Message<StateStruct> {
    _to: string
    _from: string
    _body: string

    constructor(private state:StateStruct | {[k: string]: any}) {}

    to(to: string){
        this._to = to
        return this;
    }
    from(from: string){
        this._from = from
        return this;
    }
    body(text: string){
        this._body = Mustache.render(text,this.state)
    }
}