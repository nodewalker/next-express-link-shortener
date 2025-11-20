import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const Config = {
  server: {
    port: parseInt(process.env.PORT),
  },
};
