import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({ path: '../../config/.env' });

const privateKey = process.env.PRIVATEKEY as string

export function sign(object: Object, options?: jwt.SignOptions | undefined){
    return jwt.sign(object, privateKey, options)
}

export function decode(token: string){
    try{
        const decoded = jwt.verify(token, privateKey)
        return{valid: true, expired: false, decoded}
    }catch (error){
        return{
            valid: false, expired: error.message === "jwt expired", decoded: null
        }
    }
}