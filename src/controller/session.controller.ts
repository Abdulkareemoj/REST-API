import { validatePassword } from "../service/user.service";
import { Request, Response } from "express";
import config from "config"
 import { createSession, findSessions, updateSession } from "../service/session.service" //createAccessToken
import {get} from "lodash"
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response){


  
// const refreshToken = config.get<string>("refreshToken")


    //Validate the email and password
const user = await validatePassword(req.body)
if (user){
    return res.status(401).send("Invalid username or password")
}

    //Create a session
const session = await createSession(user._id, req.get("user-agent") || "")

    //Create access token
 const accessToken = signJwt(
    {...user,
    session: session._id }, 
    {expiresIn: config.get("acccessTokenttl") }
    )
    //Create refresh token

const refreshToken = signJwt(
    {...user,
    session: session._id }, 
    {expiresIn: config.get("refreshTokenttl")}
)

    //Send access and refresh token back
    return res.send({accessToken, refreshToken})
}

export async function invalidateUserSessionHandler(req: Request, res: Response){
    const sessionId = get(req, "user.session")
    await updateSession({_id: sessionId}, {valid: false})
    return res.sendStatus(sendStatus(200)
    //     {
    //     accessToken: null,
    //     refreshToken: null,
    //typesript added all this, idont know why, but if its breaking change the return to sendstatus(200)
        
        
    // }
    )
}


export async function getUserSessionsHandler(req: Request, res: Response){
const userId = res.locals.user._id
const sessions = await findSessions({user: userId, valid: true})
return res.send(sessions)
}

function sendStatus(arg0: number): number {
    throw new Error("Function not implemented.");
}
