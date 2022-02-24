import Msg from "./Msg";

abstract class SmsDriver {
    abstract send(msg: Msg): Promise<boolean>;
}

export default SmsDriver