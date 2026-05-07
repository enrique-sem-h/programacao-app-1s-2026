import express from "express";
import { db } from "../utils/database/index.ts";
import { usuarios } from "../utils/database/schemas/UserSchema.ts";
import * as authController from "../controllers/authController.ts";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
  const response = await db.execute("SELECT 1 + 1 AS result");
  const result = response[0][0].result;

  res.json({ message: "Hello World!", result: result });
});

router.post("/login", authController.login);

export default router;
