// @deno-types="npm:@types/express@4.17.15"
import { Request, Response } from "npm:express@4.18.2";
// @deno-types="npm:@types/lodash@4.14.195"
import { omit } from "npm:lodash@^4.17.21";
import { createUser } from "../service/user.service";
import log from "../logger";
import { CreateUserInput } from "../schema/user.schema";
export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response,
) {
  try {
    const user = await createUser(req.body);
    //omit password
    return res.send(omit(user.toJSON(), "password"));
    //look at previous commit incase this doesnt work out well edd74a1
  } catch (e: unknown) {
    log.error(e);
    if (e instanceof Error) {
      return res.status(409).send(e.message);
    }
    return res.status(500).send("Internal Server Error");
  }
}
