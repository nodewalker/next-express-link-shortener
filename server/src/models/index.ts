import { Config } from "../utils/config";
import { LinkModel } from "./link";
import { UserModel } from "./user";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: Config.db.host,
  port: Config.db.port,
  username: Config.db.username,
  password: Config.db.password,
  database: Config.db.name,
  synchronize: true,
  logging: false,
  entities: [UserModel, LinkModel],
});

export { UserModel, LinkModel };
