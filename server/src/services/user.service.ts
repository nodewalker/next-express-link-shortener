import { UserModel } from "../models";
import { CreateUserDetails } from "../utils/types";

class D {
  async createUser(details: CreateUserDetails) {
    const existUser = await this.findUser({ username: details.username });
    if (existUser)
      return {
        data: null,
        msg: "error",
        error: "Username already exist",
        status: 400,
      };

    const user = new UserModel();
    user.username = details.username;
    user.password = details.password;
    const r = await user.save();
    return { data: r, msg: "success", status: 200 };
  }

  async findUser(details: { username?: string; id?: string }) {
    const user = await UserModel.findOne({
      where: [{ id: details.id }, { username: details.username }],
    });
    return user;
  }

  async profile(userId: string) {
    const user = await this.findUser({ id: userId });
    if (!user)
      return { data: null, msg: "error", error: "User not found", status: 404 };
    return { data: user, msg: "success", status: 200 };
  }
}

export const UserService = new D();
