// @deno-types="npm:@types/express@4.17.15"
import { Express, Request, Response } from "npm:express@4.18.2";
import { createUserHandler } from "../controller/user.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  invalidateUserSessionHandler,
} from "../controller/session.controller";
import {
  createPostHandler,
  deletePostHandler,
  getPostHandler,
  updatePostHandler,
} from "../controller/post.controller";
import validateRequest from "../middleware/validateRequest";
import requiresUser from "../middleware/requiresUser";
import { createUserSchema } from "../schema/user.schema";
import { createUserSessionSchema } from "../schema/session.schema";
import {
  createPostSchema,
  deletePostSchema,
  updatePostSchema,
} from "../schema/post.schema";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  //Register User
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  //Login User
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler,
  );

  //User sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  //Logout
  app.delete("/api/session", requiresUser, invalidateUserSessionHandler);

  //Posts

  //Create Post
  app.post(
    "api/posts",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler,
  );

  //Get Post
  app.get("api/posts/:postId", getPostHandler);

  //Update a Post
  app.put("api/posts/:postId", [
    requiresUser,
    validateRequest(updatePostSchema),
  ], updatePostHandler);

  //Delete a Post
  app.delete("api/posts/:postId", [
    requiresUser,
    validateRequest(deletePostSchema),
  ], deletePostHandler);
}
