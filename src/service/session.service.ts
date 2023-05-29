import Session, {SessionDocument} from "../model/session.model"
import UserDocument from '../model/user.model'
import {sign} from '../utils/jwt.utils'
import dotenv from 'dotenv';
dotenv.config({ path: '../../config/.env' });

const accessToken = process.env.ACCESSTOKEN as string

console.log(äccessToken)
export async function createSession(userId: string, userAgent: string){
    const session = await Session.create({user: userId, userAgent})

    return session.toJSON
}

export function createAccessToken({
    user,
    session,
}:{
    user:
    |Omit<UserDocument, "password">
    |LeanDocument<Omit<UserDocument, "password">>
    session:
    |Omit<SessionDocument, "password">
    |LeanDocument<Omit<SessionDocument, "password">>
} ){
const accessToken = sign(
    {...user, session: session_id},
    {expiresIn: process.env.accessToken} //15 min

)
return accessToken
}