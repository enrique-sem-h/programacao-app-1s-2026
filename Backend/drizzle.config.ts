import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export default defineConfig({
  out: "./utils/database/drizzle",
  dialect: "mysql",
  schema: "./utils/database/schemas/*",
  dbCredentials: {
    url: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  },
});
