import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const AuthGuard = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers);
  const bearer = req.headers.authorization;
  if (!bearer)
    return res
      .status(401)
      .json({ msg: "error", error: "Unauthorization", status: 401 });

  if (bearer.split(" ")[0] !== "Bearer")
    return res
      .status(401)
      .json({ msg: "error", error: "Invalid token", status: 401 });

  const access_token = bearer.split(" ")[1];
  const user = AuthService.validate(access_token);
  if (!user)
    return res
      .status(401)
      .json({ msg: "error", error: "Invalid token", status: 401 });

  req["user"] = { id: user.id };
  next();
};
