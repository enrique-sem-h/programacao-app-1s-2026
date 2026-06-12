import express from "express";
import * as userController from "../controllers/userController.ts";
import * as middleware from "../../infra/jwt/middleware.ts";
import upload from "root/infra/multer/multer.ts";
import validate from "root/infra/validations/validations.ts";
import {
	createUserSchema,
	userPhotoSchema,
	updateUserSchema,
} from "root/infra/validations/schemas/userSchema.ts";

const router = express.Router();

router.get("/user/:id", middleware.verifyToken, userController.getUser);
router.post(
	"/users",
	upload.single("foto"),
	validate({ body: createUserSchema, file: userPhotoSchema.required() }),
	userController.signup,
);
router.patch(
	"/user/:id",
	middleware.verifyToken,
	upload.single("foto"),
	validate({ file: userPhotoSchema, body: updateUserSchema }),
	userController.updateUser,
);
router.delete("/user", middleware.verifyToken, userController.deleteUser);

export default router;
