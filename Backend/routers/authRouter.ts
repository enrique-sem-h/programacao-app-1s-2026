import express from "express";
import { db } from "../utils/database/index.ts";
import { usuarios } from "../utils/database/schemas/UserSchema.ts";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
  const response = await db.execute("SELECT 1 + 1 AS result");
  const result = response[0][0].result;
  console.log(result);

  res.json({ message: "Hello World!", result: result });
});

router.get("/users", async (req: any, res: any) => {
  const response = await db.select().from(usuarios);
  res.json(response);
});

export default router;
