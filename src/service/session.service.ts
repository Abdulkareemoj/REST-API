import Session, {SessionDocument} from "../model/session.model"
import UserDocument from '../model/user.model'
import dotenv from 'dotenv';
dotenv.config({ path: '../../config/.env' });

const accessTokenTtl = process.env.ACCESSTOKEN

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
    {...user, sesion: session_id},
    {expiresIn: process.env.accessTokenTtl}

)
return accessToken
}