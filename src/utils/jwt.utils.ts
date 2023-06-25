import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({ path: '../../config/.env' });

const privateKey = process.env.PRIVATEKEY as string
const publicKey = process.env.PRIVATEKEY as string

export function signJwt(object: Object, options?: jwt.SignOptions | undefined){
    return jwt.sign(object, privateKey, {
       ...( options && options),
    algorithm: "RS256",  
})
}

export function verifyJwt(token: string){
    try{
        const decoded = jwt.verify(token, publicKey)
        return{valid: true, expired: false, decoded}
    }catch (error: any){
        return{
            valid: false, expired: error.message === "jwt expired", decoded: null
        }
    }
}