import express from "express";
import * as authController from "../controllers/authController.ts";
import * as middleware from "root/infra/jwt/middleware.ts";

const router = express.Router();

router.post("/login", authController.login);
router.get("/verify", middleware.verifyToken, authController.verifyToken);

export default router;
