import { LinkModel } from "../models";
import { CreateLinkDetails } from "../utils/types";
import { UserService } from "./user.service";

class D {
  async create(details: CreateLinkDetails) {
    const userInfo = await UserService.findUser({ id: details.userId });
    if (!userInfo)
      return { data: null, msg: "error", error: "User not found", status: 404 };
    const link = new LinkModel();
    link.user = userInfo;
    link.long = details.longLink;
    const r = await link.save();
    const { user, ...linkDataWithoutUser } = r;
    return { data: linkDataWithoutUser, msg: "success", status: 201 };
  }

  async get(userId: string) {
    const user = await UserService.findUser({ id: userId });
    if (!user)
      return {
        data: null,
        msg: "error",
        error: "User not found",
        status: 404,
      };
    const links = await LinkModel.find({ where: { user: user } });
    return { data: links, msg: "success", status: 200 };
  }

  async getLongLinkByShort(shortLink: number) {
    const link = await LinkModel.findOne({ where: { id: shortLink } });
    if (!link)
      return { data: null, msg: "error", error: "Link not found", status: 404 };
    return { data: link, msg: "success", status: 200 };
  }

  async remove(userId: string, linkId: number) {
    const user = await UserService.findUser({ id: userId });
    if (!user)
      return {
        data: null,
        msg: "error",
        error: "User not found",
        status: 404,
      };
    const link = await LinkModel.findOne({ where: { id: linkId } });
    if (!link)
      return {
        data: null,
        msg: "error",
        error: "Link not found",
        status: 404,
      };
    await LinkModel.remove(link);
    return { data: null, msg: "success", status: 200 };
  }
}

export const LinkService = new D();
