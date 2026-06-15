import express from "express";
import * as authController from "../controllers/authController.ts";
import * as middleware from "root/infra/jwt/middleware.ts";
import { userLoginSchema } from "root/infra/validations/schemas/userSchema.ts";
import validate from "root/infra/validations/validations.ts";

const router = express.Router();

router.post(
	"/login",
	validate({ body: userLoginSchema }),
	authController.login,
);
router.get("/verify", middleware.verifyToken, authController.verifyToken);

export default router;
