import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export default defineConfig({
  out: "./infra/database/drizzle",
  dialect: "mysql",
  schema: "./infra/database/schemas/*.ts",
  dbCredentials: {
    url: `mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`,
  },
});
