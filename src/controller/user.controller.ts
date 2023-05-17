import { Request, Response } from "express";
import {omit} from "lodash"
import {createUser} from '../service/user.service'

export async function createUserHandler(res:Request, req:Response){
    try{
        const user = await createUser(req.body)
   return res.send(omit(user.toJSON(), "password"))
    }
    catch(e){
return res.status(409).send(e.message)
    }

}
