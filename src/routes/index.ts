import { Express, Request, Response } from "express"
import { createUserHandler } from "../controller/user.controller"
export default function (app: Express){
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200))

    //Register User
    app.post("/api/users", validateRequest(createUserSchema), createUserHandler)

    //Login User
    app.get()

    //User sessions
    app.get()

    //Logout
    app.delete()
}