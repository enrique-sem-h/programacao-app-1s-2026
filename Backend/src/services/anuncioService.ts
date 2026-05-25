import type { AnuncioDTO } from "@/types/types.ts";
import * as FotoAnuncioService from "../services/fotoAnuncioService.ts";
import * as AnuncioRepository from "@/repositories/anuncioRepository.ts";
import { randomUUID } from "crypto";

export async function create(
  body: AnuncioDTO,
  fotos: Express.Multer.File[],
): Promise<AnuncioDTO | null> {
  const anuncioId = randomUUID();

  body.id = anuncioId;
  const created = await AnuncioRepository.create(body);

  if (created) {
    // upload das fotos
    await FotoAnuncioService.bulkUpload(anuncioId, fotos);
    return body;
  }

  return null;
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

export async function getUsuarioAnuncios(usuarioId: string) {
  const anuncios = await AnuncioRepository.getUsuarioAnuncios(usuarioId);
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

export async function getAnuncioById(anuncioId: string) {
  const anuncio = await AnuncioRepository.getAnuncioById(anuncioId);

  if (!anuncio) {
    return null;
  }

  const fotos = await FotoAnuncioService.getFotos(anuncio.id);

  return {
    ...anuncio,
    fotos,
  };
}

export async function updateAnuncio(id: string, body: Partial<AnuncioDTO>) {
  const updatedAnuncio = await AnuncioRepository.updateAnuncio(id, body);

  return updatedAnuncio;
}

export async function deleteAnuncio(id: string) {
  return await AnuncioRepository.deleteAnuncio(id);
}
