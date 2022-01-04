import * as jwt from "jsonwebtoken";
import {Env} from "../index"


let  generate = async function (payload: string | object,expiresIn: string = null): Promise<string> {
    return new Promise((resolve, reject) => {

        let jwt_key = Env.get('JWT_KEY', null)
        let jwt_expiry = expiresIn ?? Env.get('JWT_KEY_EXPIRES_IN', null)

        if (!jwt_key) {
            reject('Specify JWT_KEY in .env file ')
            return;
        }

        jwt.sign(payload, jwt_key,
            {
                expiresIn: jwt_expiry,
                algorithm: Env.get('JWT_ALGORITHM', 'HS256')
            },
            (err, encoded) => {
                if (err){
                    reject(err.message)
                    return;
                }
                resolve(encoded)
            }
        )
    })
}

let  decode = async function <T>(token: string): Promise<T>{
    let jwt_key = Env.get('JWT_KEY', null)

    return  new Promise((resolve, reject) => {
        if (!jwt_key) {
            reject('Specify JWT_KEY in .env file ')
            return;
        }
        jwt.verify(token, jwt_key, function(err, decoded) {
            if (err) {
                reject(err)
                return;
            }
            resolve(decoded)
        });
    })
}


export {
    generate,
    decode
}