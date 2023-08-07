import Session, {SessionDocument} from "../model/session.model"
import UserDocument from '../model/user.model'
import {signJwt, verifyJwt} from '../utils/jwt.utils'
import {get} from 'lodash'

import { findUser } from "./user.service"
import { FilterQuery, UpdateQuery } from "mongoose"
import config from "config"

// const accessToken = config.get<string>("accessTokenttl")
// const refreshToken = config.get<string>("refreshTokenttl")

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
    |Omit<typeof UserDocument, "password">
    |LeanDocument<Omit<UserDocument, "password">>
    session:
    |Omit<SessionDocument, "password">
    |LeanDocument<Omit<SessionDocument, "password">>
} ) // {
// const accessToken = signJwt(
//     {...user, session: session_id},
//     {expiresIn: process.env.accessToken} //15 min

// )
// return accessToken
// }

export async function reIssueAccessToken({
    refreshToken
}: {
    refreshToken: string
})
{

const {decoded} = verifyJwt(refreshToken)
if(!decoded || !get(decoded, "session")) 
return false

//get session
const session = await Session.findById(get(decoded, "session"))


//check if session is valid
if(!session || !session?.valid)


return false

const user = await findUser({ _id: session.user })

if(!user)
 return false

const accessToken = signJwt({ ...user, session: session_.id }
    //  {expiresIn: }
    )


return accessToken
}

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
){
    return Session.updateOne(query, update)
}

export async function findSessions(
    query: FilterQuery<SessionDocument>

){
    return Session.find(query).lean()
}