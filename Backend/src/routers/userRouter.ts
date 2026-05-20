import express from "express";
import { db } from "root/infra/database/index.ts";
import { usuarios } from "root/infra/database/schemas/UserSchema.ts";
import * as userController from "../controllers/userController.ts";
import * as middleware from "../../infra/jwt/middleware.ts"

const router = express.Router();

router.post("/signup", userController.signup);
router.get("/user/:id", userController.getUser);
router.put("/user/:id", middleware.verifyToken, userController.updateUser);

export default router;
