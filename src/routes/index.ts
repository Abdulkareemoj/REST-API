import { Express, Request, Response } from "express"
import { createUserHandler } from "../controller/user.controller"
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from "../controller/session.controller"
import validateRequest from '../middleware/validateRequest'
import  requiresUser from '../middleware/requiresUser'
import {createUserSchema, createUserSessionSchema} from '../schema/user.schema'
export default function (app: Express){
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200))

    //Register User
    app.post("/api/users", validateRequest(createUserSchema), createUserHandler)

    //Login User
    app.post( "/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler)

    //User sessions
    app.get("/api/sessions", requiresUser, getUserSessionsHandler)

    //Logout
    app.delete("/api/session", requiresUser, invalidateUserSessionHandler)

    //Posts

    //Create Post
//app.post()

    //Get Post
    //app.get

    //Update a Post
    //app.put()

    //Delete a Post
    //app.delete()
}