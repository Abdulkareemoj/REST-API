// @deno-types="npm:@types/lodash@4.14.195"
import { get } from "npm:lodash@^4.17.21";
// @deno-types="npm:@types/express@4.17.15"
import { NextFunction, Request, Response } from "npm:express@4.18.2";

const requiresUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = get(req, "user");
  if (!user) {
    return res.sendStatus(403);
  }
  return next();
};
export default requiresUser;
