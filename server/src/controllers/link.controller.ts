import { Request, Response } from "express";
import { LinkService } from "../services/link.service";

class D {
  async create(req: Request, res: Response) {
    const r = await LinkService.create({
      ...req.body,
      userId: req["user"]!.id,
    });
    return res.status(r.status).json(r);
  }

  async getAll(req: Request, res: Response) {
    const r = await LinkService.get(req["user"]!.id);
    return res.status(r.status).json(r);
  }

  async remove(req: Request, res: Response) {
    const r = await LinkService.remove(req["user"]!.id, req.body.linkId);
    return res.status(r.status).json(r);
  }
}

export const LinkController = new D();
