import type { CreateAnuncioDTO } from "@/types/types.ts";
import * as FotoAnuncioService from "../services/fotoAnuncioService.ts";
import * as AnuncioRepository from "@/repositories/anuncioRepository.ts";
import { randomUUID } from "crypto";

export async function create(
  body: CreateAnuncioDTO,
  fotos: Express.Multer.File[],
): Promise<CreateAnuncioDTO> {
  const anuncioId = randomUUID();

  body.id = anuncioId;
  const created = await AnuncioRepository.create(body);

  if (created) {
    // upload das fotos
    await FotoAnuncioService.bulkUpload(anuncioId, fotos);
    return body;
  }
}

export async function getAnuncios() {
  const anuncios = await AnuncioRepository.getAnuncios();

  const anunciosComFotos = [];

  if (!anuncios) {
    return null;
  }

  for (const anuncio of anuncios) {
    const fotos = await FotoAnuncioService.getFotos(anuncio.id);

    anunciosComFotos.push({
      ...anuncio,
      fotos,
    });
  }

  return anunciosComFotos;
}
