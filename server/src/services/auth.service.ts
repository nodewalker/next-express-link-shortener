import { verify } from "./../utils/helper";
import * as JWT from "jsonwebtoken";
import { Config } from "../utils/config";
import { UserService } from "./user.service";
import { CreateUserDetails } from "../utils/types";

class D {
  async reg(details: CreateUserDetails) {
    const user = await UserService.createUser(details);
    if (user.msg === "error" || !user.data)
      return {
        data: null,
        msg: "error",
        error: user.error,
        status: user.status,
      };
    const { password, ...userDataWithoutPassword } = user.data;
    const tokens = this.genTokens(user.data.id);
    return {
      data: { user: userDataWithoutPassword, tokens: tokens.data },
      msg: "success",
      status: 200,
    };
  }

  async login(details: { username: string; password: string }) {
    const user = await UserService.findUser({ username: details.username });
    if (!user || !user.password)
      return {
        data: null,
        msg: "error",
        error: "Username not found",
        status: 404,
      };
    if (!(await verify(details.password, user.password)))
      return {
        data: null,
        msg: "error",
        error: "Invalid password",
        status: 400,
      };
    const { password, ...userDataWithoutPassword } = user;
    const tokens = AuthService.genTokens(user.id);
    return {
      data: { user: userDataWithoutPassword, tokens: tokens.data },
      msg: "success",
      status: 200,
    };
  }

  genTokens(userId: string) {
    return {
      data: {
        access_token: JWT.sign(
          { id: userId, type: "access" },
          Config.server.jwtsecret,
          {
            expiresIn: "10m",
          }
        ),
        refresh_token: JWT.sign(
          { id: userId, type: "refresh" },
          Config.server.jwtsecret,
          {
            expiresIn: "30d",
          }
        ),
      },
      msg: "success",
      error: null,
      status: 200,
    };
  }

  refresh(token: string) {
    const payload = JWT.verify(
      token,
      Config.server.jwtsecret
    ) as JWT.JwtPayload;
    if (payload.type !== "refresh")
      return { data: null, msg: "error", error: "Invalid token", status: 400 };
    const tokens = this.genTokens(payload.id);
    if (tokens.msg === "error")
      return {
        data: null,
        msg: "error",
        error: tokens.error,
        status: tokens.status,
      };
    return { data: tokens.data, msg: "success", status: 200 };
  }

  validate(token: string) {
    try {
      const payload = JWT.verify(
        token,
        Config.server.jwtsecret
      ) as JWT.JwtPayload;
      return payload;
    } catch (error) {
      return null;
    }
  }
}

export const AuthService = new D();
