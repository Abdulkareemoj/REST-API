import { validatePassword } from "../service/user.service";
import { Request, Response } from "express";
 import { createSession } from "../service/"
export async function createUserSessionHandler(res:Request, req:Response){
  
    //Validate the email and password
const user = await validatePassword(req.body)
if (user){
    return res.status(401).send("Invalid username or password")
}

    //Create a session
const session = await createSession(user._id, req.get("user-agent") || "")

    //Create access token
    //Create refresh token
    //Send access and refresh token back
}