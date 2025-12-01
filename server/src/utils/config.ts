import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const Config = {
  server: {
    port: parseInt(process.env.PORT as string),
    jwtsecret: process.env.SECRET as string,
  },

  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
};
