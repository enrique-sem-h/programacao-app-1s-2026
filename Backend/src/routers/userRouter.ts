import express from "express";
import * as userController from "../controllers/userController.ts";
import * as middleware from "../../infra/jwt/middleware.ts";
import upload from "root/infra/multer/multer.ts";

const router = express.Router();

router.get("/user/:id", middleware.verifyToken, userController.getUser);
router.post("/users", upload.single("foto"), userController.signup);
router.patch("/user/:id", middleware.verifyToken, userController.updateUser);
router.delete("/user", middleware.verifyToken, userController.deleteUser);

export default router;
