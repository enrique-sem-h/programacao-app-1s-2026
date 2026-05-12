import express from "express";
import { db } from "root/infra/database/index.ts";
import { usuarios } from "root/infra/database/schemas/UserSchema.ts";
import * as userController from "../controllers/userController.ts";

const router = express.Router();

router.post("/signup", userController.signup);
router.get("/users", userController.getUsers);

export default router;
