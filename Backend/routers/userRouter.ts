import express from "express";
import { db } from "../utils/database/index.ts";
import { usuarios } from "../utils/database/schemas/UserSchema.ts";
import * as userController from "../controllers/userController.ts";

const router = express.Router();

router.post("/signup", userController.signup);
router.get("/users", userController.getUsers);

export default router;