import { UserService } from "../services/user.service";
import { Request, Response } from "express";

class D {
  async profile(req: Request, res: Response) {
    const r = await UserService.profile(req["user"]!.id);
    return res.status(r.status).json(r);
  }
}

export const UserController = new D();
