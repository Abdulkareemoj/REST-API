import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({ path: '../../config/.env' });

const privateKey = process.env.PRIVATEKEY as string

export function sign(object: Object, options?: jwt.SignOptions | undefined){
    return jwt.sign(object, privateKey, options)
}