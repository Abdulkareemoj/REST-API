import { Request, Response } from "express";
import {omit} from "lodash"
import {createUser} from '../service/user.service'
// import log from '../logger'
export async function createUserHandler(req:Request, res:Response){
    try{
        const user = await createUser(req.body)
   return res.send(omit(user.toJSON(), "password"))
    //look at previous commit incase this doesnt work out well
   } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(409).send(e.message);
    }
    return res.status(500).send("Internal Server Error");
  }
}