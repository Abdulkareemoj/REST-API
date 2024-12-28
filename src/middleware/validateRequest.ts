import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

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
      console.log(e);
      return res.status(400).send(e.error);
    }
  };
export default validateRequest;
