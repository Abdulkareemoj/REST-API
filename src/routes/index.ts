import { Express, Request, Response } from "express";
// import { authenticate, checkRole } from "../middleware/auth";
import { signIn, signOut } from "../controller/auth.controller.ts";
import {
  createProductHandler,
  updateProductHandler,
  getProductHandler,
  deleteProductHandler,
} from "../controller/product.controller.ts";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "../controller/session.controller.ts";
import { createUserHandler } from "../controller/user.controller.ts";
import {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "../schema/product.schema.ts";
import {
  createUserSchema,
  createUserSessionSchema,
} from "../schema/user.schema.ts";
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  updatePostSchema,
} from "../schema/post.schema.ts";
import {
  createPostHandler,
  getPostHandler,
  updatePostHandler,
} from "../controller/post.controller.ts";
import requiresRole from "../middleware/requiresRole.ts";
import { permissions } from "../middleware/roles.ts";
import validateRequest from "../middleware/validateRequest.ts";
//TODO add other roles with requiresRole
function routes(app: Express) {
  app.get("/api/", (req: Request, res: Response) => {
    return res.send("bruhh");
  });

  app.post("/api/signin", signIn);

  app.post("/api/signout", signOut);

  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  //Session endpoints
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requiresRole, getUserSessionsHandler);

  app.delete("/api/sessions", requiresRole, deleteSessionHandler);

  //Product endpoints
  app.post(
    "/api/products",
    [
      requiresRole(permissions.createProduct),
      validateRequest(createProductSchema),
    ],
    createProductHandler
  );

  app.put(
    "/api/products/:productId",
    [
      requiresRole(permissions.updateProduct),
      validateRequest(updateProductSchema),
    ],
    updateProductHandler
  );

  app.get(
    "/api/products/:productId",
    validateRequest(createProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [
      requiresRole(permissions.deleteProduct),
      validateRequest(deleteProductSchema),
    ],
    deleteProductHandler
  );

  //Post endpoints
  app.post(
    "/api/posts",
    [
      requiresRole(permissions.createProduct),
      validateRequest(createPostSchema),
    ],
    createPostHandler
  );

  app.put(
    "/api/posts/:postId",
    [
      requiresRole(permissions.updateProduct),
      validateRequest(updatePostSchema),
    ],
    updatePostHandler
  );

  app.get("/api/posts/:postId", validateRequest(getPostSchema), getPostHandler);

  app.delete(
    "/api/posts/:postId",
    [
      requiresRole(permissions.deleteProduct),
      validateRequest(deletePostSchema),
    ],
    getPostHandler
  );
}

export default routes;
