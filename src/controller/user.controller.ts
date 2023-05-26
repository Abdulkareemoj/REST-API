import { Request, Response } from "express";
import {omit} from "lodash"
import {createUser} from '../service/user.service'
import log from '../logger'
export async function createUserHandler(res:Request, req:Response){
    try{
        const user = await createUser(req.body)
   return res.send(omit(user.toJSON(), "password"))
    }
    catch(e){
return res.status(409).send(e.message)
    }

}
export async function createUserSessionHandler(res:Request, req:Response){
    //Validate the email and password
    //Create a session
    //Create access token
    //Create refresh token
    //Send access and refresh token back
}