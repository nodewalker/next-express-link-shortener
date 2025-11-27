import "reflect-metadata";
import * as Express from "express";
import { Config } from "./utils/config";
import Routes from "./routes";
import { AppDataSource } from "./models";

const port = Config.server.port;

const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
  }

  const app = Express();

  app.use(Express.urlencoded({ extended: false }));
  app.use(Express.json());

  app.use(Routes);

  app.listen(port, "0.0.0.0", () => console.log(`Server start on: ${port}`));
};

void main();
