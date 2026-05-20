import express from "express";
import * as anuncioController from "../controllers/anuncioController.ts";
import * as middleware from "../../infra/jwt/middleware.ts";
import upload from "root/infra/multer/multer.ts";

const router = express.Router();

router.post(
  "/anuncios",
  middleware.verifyToken,
  upload.array("fotos", 7),
  anuncioController.create,
);
router.get("/anuncios", middleware.verifyToken, anuncioController.getAnuncios);

export default router;
