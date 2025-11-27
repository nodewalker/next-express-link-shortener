import { AuthService } from "./../services/auth.service";
import { Request, Response } from "express";

class D {
  async reg(req: Request, res: Response) {
    const r = await AuthService.reg(req.body);
    return res.status(r.status).json(r);
  }

  async login(req: Request, res: Response) {
    const r = await AuthService.login(req.body);
    return res.status(r.status).json(r);
  }

  async refresh(req: Request, res: Response) {
    const r = AuthService.refresh(req.body.token);
    return res.status(r.status).json(r);
  }
}

export const AuthController = new D();
