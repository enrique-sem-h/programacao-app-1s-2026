import express from "express";
import * as userController from "../controllers/userController.ts";
import * as middleware from "../../infra/jwt/middleware.ts";

const router = express.Router();

router.get("/user/:id", middleware.verifyToken, userController.getUser);
router.post("/users", userController.signup);
router.patch("/user/:id", middleware.verifyToken, userController.updateUser);
router.delete("/user", middleware.verifyToken, userController.deleteUser);

export default router;
