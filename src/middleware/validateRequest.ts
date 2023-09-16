import { AnyZodObject } from "npm:zod@^3.21.4";
// @deno-types="npm:@types/express@4.17.15"
import { NextFunction, Request, Response } from "npm:express@4.18.2";
import log from "../logger";

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();

      return next();
    } catch (e: any) {
      log.error(e);
      return res.status(400).send(e.error);
    }
  };
export default validateRequest;
