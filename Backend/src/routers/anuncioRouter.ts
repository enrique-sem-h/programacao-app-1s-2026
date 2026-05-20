import express from "express";
import * as anuncioController from "../controllers/anuncioController.ts";
import * as middleware from "../../infra/jwt/middleware.ts";

const router = express.Router();

// router.post("anuncios", middleware.verifyToken, )

export default router;