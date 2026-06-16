import express from "express";
import * as pagamentoController from "../controllers/pagamentoController.ts";
import * as middleware from "../../infra/jwt/middleware.ts";
import validate from "root/infra/validations/validations.ts";
import { pagamentoSchema } from "root/infra/validations/schemas/pagamentoSchema.ts";

const router = express.Router();

router.patch("/alugueis/:id/status", middleware.verifyToken, pagamentoController.atualizarStatus);

router.post("/alugueis/:id/avaliar", middleware.verifyToken, pagamentoController.avaliarAluguel);

router.post(
	"/pagamento/criar",
	validate({ body: pagamentoSchema }),
	middleware.verifyToken,
	pagamentoController.criarPagamento,
);
router.post(
	"/pagamento/confirmar",
	middleware.verifyToken,
	pagamentoController.confirmarPagamento,
);
router.get(
	"/alugueis/meus",
	middleware.verifyToken,
	pagamentoController.getMeusAlugueis,
);

export default router;
