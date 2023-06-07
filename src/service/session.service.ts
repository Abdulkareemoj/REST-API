import Session, {SessionDocument} from "../model/session.model"
import UserDocument from '../model/user.model'
import {sign} from '../utils/jwt.utils'
import {get} from 'lodash'
import dotenv from 'dotenv'
import { findUser } from "./user.service"
import { FilterQuery, UpdateQuery } from "mongoose"
dotenv.config({ path: '../../config/.env' });

const accessToken = process.env.ACCESSTOKEN as string

// console.l/og(accessToken)
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

export async function reIssueAccessToken({
    refreshToken,
}: {
    refreshToken: string
})
{

const {decoded} = decode(refreshToken)
if(!decoded || !get(decoded, "_id")) return false

//get session
const session = await Session.findById(get(decoded, "_id"))


//check if session is valid
if(!session || !session?.valid) return false

const user = await findUser({ _id: session.user })

if(!user) return false

const accessToken = createAccessToken({ user, session })


return accessToken
}

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
){
    return Session.updateOne(query, update)
}