import express from "express";
import * as anuncioController from "../controllers/anuncioController.ts";
import * as middleware from "../../infra/jwt/middleware.ts";
import upload from "root/infra/multer/multer.ts";
import {
	anuncioPhotosSchema,
	createAnuncioSchema,
} from "root/infra/validations/schemas/anuncioSchema.ts";
import validate from "root/infra/validations/validations.ts";

const router = express.Router();

router.post(
	"/anuncios",
	middleware.verifyToken,
	upload.array("fotos", 7),
	validate({body: createAnuncioSchema, files: anuncioPhotosSchema}),
	anuncioController.create,
);
router.get("/anuncios", anuncioController.getAnuncios);
router.get(
	"/anuncios/meus-anuncios",
	middleware.verifyToken,
	anuncioController.getUsuarioAnuncios,
);
router.get("/anuncios/:id", anuncioController.getAnuncioById);
router.patch(
	"/anuncios/:id",
	middleware.verifyToken,
	anuncioController.updateAnuncio,
);
router.delete(
	"/anuncios/:id",
	middleware.verifyToken,
	anuncioController.deleteAnuncio,
);

export default router;
