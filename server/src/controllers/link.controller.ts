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

  async getLongLinkByShort(req: Request, res: Response) {
    if (!Number.isNaN(+req.params.shortLink)) {
      const r = await LinkService.getLongLinkByShort(
        parseInt(req.params.shortLink)
      );
      return res.status(r.status).json(r);
    }
    return res
      .status(400)
      .json({ data: null, msg: "error", error: "Invalid param", status: 400 });
  }

  async remove(req: Request, res: Response) {
    const r = await LinkService.remove(req["user"]!.id, req.body.linkId);
    return res.status(r.status).json(r);
  }
}

export const LinkController = new D();
