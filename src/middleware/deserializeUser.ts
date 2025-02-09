import { get } from "lodash-es";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

export default async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  const refreshToken = Array.isArray(get(req, "headers.x-refresh", []))
    ? get(req, "headers.x-refresh", [])[0]
    : get(req, "headers.x-refresh");
  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({
      refreshToken: refreshToken[0],
    });
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const result = verifyJwt(newAccessToken);
      res.locals.user = result.decoded;
      return next();
    }
  }
  return next();
}
