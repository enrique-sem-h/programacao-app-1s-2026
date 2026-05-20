import express from "express";
import { db } from "root/infra/database/index.ts";
import { usuarios } from "root/infra/database/schemas/UserSchema.ts";
import * as authController from "../controllers/authController.ts";

const router = express.Router();

router.post("/login", authController.login);

export default router;
