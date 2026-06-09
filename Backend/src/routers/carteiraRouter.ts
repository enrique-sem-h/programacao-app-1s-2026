import express from "express";
import * as carteiraController from "../controllers/carteiraController.ts";
import * as middleware from "../../infra/jwt/middleware.ts";

const router = express.Router();

router.get("/carteira", middleware.verifyToken, carteiraController.getCarteira);

export default router;