import Express from "express";
import { Config } from "./utils/config";
import Routes from "./routes";

const port = Config.server.port;

const main = () => {
  const app = Express();
  const router = Express.Router();

  app.use(Routes);

  app.listen(port, "0.0.0.0", () => console.log(`Server start on: ${port}`));
};

void main();
