import type { Request, Response } from "express";
import { anuncios } from "../../infra/database/schemas/anunciosSchema.ts";
import * as anuncioService from "@/services/anuncioService.ts";
import type { CreateAnuncioDTO } from "@/types/types.ts";

export async function create(req: Request, res: Response) {
  // Fazer a validação dos dados
  const fail = (msg: string, status = 400) => {
    res.status(status).json({ error: msg });
  };

  try {
    const user = req.user;
    const fotos = req.files as Express.Multer.File[];
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    const categoria = req.body.categoria;
    const valorDiario = req.body.valorDiario;
    const caucao = req.body.caucao;

    if (!user) {
      return fail("usuário não autorizado", 401);
    }
    if (!fotos || fotos.length < 3) {
      return fail("Erro: fotos não recebidas ou inválidas");
    }
    if (!titulo) return fail("Tente novamente! Título não preenchido");
    if (!descricao) return fail("Tente novamente! Descricao nao preenchida");
    if (
      !categoria ||
      !(anuncios.categoria.enumValues as any).includes(categoria)
    ) {
      return fail("Tente novamente! Categoria não preenchida ou inválida");
    }
    if (!valorDiario || Number(valorDiario) < 0)
      return fail("Tente novamente! Valor não preenchido ou inválido");
    if (!caucao || Number(caucao) < 0)
      return fail("Tente novamente! Valor cação não preenchido ou inválido");

    const anuncioDto = {
      titulo,
      descricao,
      categoria,
      valorDiario,
      caucao,
      usuarioId: user.id,
    } as CreateAnuncioDTO;

    console.log("anuncioDto", anuncioDto);

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
    return res.status(200).json({ data: anuncios });
  }

  return res.status(500).json({ error: "Erro ao buscar anúncios" });
}
