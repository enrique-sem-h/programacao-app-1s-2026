import type { Request, Response } from "express";
import { anuncios } from "../../infra/database/schemas/anunciosSchema.ts";
import * as anuncioService from "@/services/anuncioService.ts";
import type { AnuncioDTO } from "@/types/types.ts";

export async function create(req: Request, res: Response) {
	// Fazer a validação dos dados
	const fail = (msg: string, status = 400) => {
		res.status(status).json({ error: msg });
	};

	try {
		const fotos = req.files as Express.Multer.File[];

		const anuncioDto = {
			titulo: req.body.titulo,
			descricao: req.body.descricao,
			categoria: req.body.categoria,
			valorDiario: req.body.valorDiario,
			caucao: req.body.caucao,
			usuarioId: req.user.id,
		} as AnuncioDTO;

		const anuncio = await anuncioService.create(anuncioDto, fotos);

		if (anuncio) {
			return res.status(201).json({ data: anuncio });
		}

		return res.status(500).json({ error: "Erro ao criar anúncio" });
	} catch (error) {
		return fail("Erro no processamento do formulario", 500);
	}
}

export async function getAnuncios(req: Request, res: Response) {
	const anuncios = await anuncioService.getAnuncios();

	if (anuncios) {
		return res.status(200).json({ anuncios });
	}

	return res.status(500).json({ error: "Erro ao buscar anúncios" });
}

export async function getUsuarioAnuncios(req: Request, res: Response) {
	const userId = req.user.id;

	const anuncios = await anuncioService.getUsuarioAnuncios(userId);

	if (anuncios) {
		return res.status(200).json({ anuncios });
	}

	return res.status(500).json({ error: "Erro ao buscar anuncios do usuario" });
}

export async function getAnuncioById(req: Request, res: Response) {
	const anuncioId = req.params.id as string;

	if (!anuncioId) {
		return res.status(400).json({ error: "ID do anuncio invalido" });
	}

	const anuncio = await anuncioService.getAnuncioById(anuncioId);

	if (anuncio) {
		return res.status(200).json({ anuncio });
	}

	return res.status(500).json({ error: "erro ao buscar anuncio" });
}

export async function updateAnuncio(req: Request, res: Response) {
	const anuncioId = req.params.id as string;
	const userId = req.user.id;

	if (!anuncioId) {
		return res.status(400).json({ error: "ID do anuncio invalido" });
	}

	const anuncio = await anuncioService.getAnuncioById(anuncioId);

	if (!anuncio) {
		return res.status(404).json({ error: "Anuncio não encontrado" });
	}

	if (anuncio.usuarioId !== userId) {
		return res.status(403).json({ error: "Usuario nao autorizado" });
	}

	const { titulo, descricao, valorDiario, caucao } = req.body;

	const updated = await anuncioService.updateAnuncio(anuncioId, {
		titulo,
		descricao,
		valorDiario,
		caucao,
	});

	if (updated) {
		return res.status(200).json({ anuncio: updated });
	}

	return res.status(500).json({ error: "Erro ao atualizar anuncio" });
}

export async function deleteAnuncio(req: Request, res: Response) {
	const anuncioId = req.params.id as string;
	const userId = req.user.id;

	if (!anuncioId) {
		return res
			.status(400)
			.json({ error: "ID do anuncio deve ser obrigatorio" });
	}

	const anuncio = await anuncioService.getAnuncioById(anuncioId);

	if (!anuncio) {
		return res.status(404).json({ error: "Anuncio não encontrado" });
	}

	if (anuncio.usuarioId !== userId) {
		return res.status(403).json({ error: "Usuario nao autorizado" });
	}

	const success = await anuncioService.deleteAnuncio(anuncio.id);

	if (success) {
		return res.status(200).json({ message: "Anuncio deletado com sucesso" });
	}

	return res.status(500).json({ error: "Erro ao deletar anuncio" });
}
