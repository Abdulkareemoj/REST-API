import { validatePassword } from "../service/user.service.ts";
import { Request, Response } from "express";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service.ts";
import { get } from "es-toolkit";
import { signJwt } from "../utils/jwt.utils.ts";
import { SessionDocument } from "../models/session.model.ts";

export async function createUserSessionHandler(req: Request, res: Response) {
  try {
    const user = await validatePassword(req.body);

    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = signJwt(
      {
        user: {
          ...user,
          session: (session as any)._id,
        },
      },
      { expiresIn: Deno.env.get("ACCESS_TOKEN_TTL") }
    );

    const refreshToken = signJwt(
      {
        user: {
          ...user,
          session: (session as any)._id,
        },
      },
      { expiresIn: Deno.env.get("REFRESH_TOKEN_TTL") }
    );

    return res.send({ accessToken, refreshToken });
  } catch (error) {
    console.error("Error creating user session:", error);
    return res.status(500).send("Internal server error");
  }
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = get(req, "user.session");
  await updateSession({ _id: sessionId }, { valid: false });
  return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}
