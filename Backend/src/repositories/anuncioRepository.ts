import type { AnuncioDTO } from "@/types/types.ts";
import { anuncios } from "@/../infra/database/schemas/anunciosSchema.ts";
import { db } from "@/../infra/database/index.ts";
import { eq } from "drizzle-orm";

export async function create(body: AnuncioDTO): Promise<AnuncioDTO | null> {
  // Chamar o Drizzle para criar anuncio
  try {
    await db.insert(anuncios).values(body);
    return body;
  } catch (error) {
    console.error("Erro ao criar anúncio:", error);
    return null;
  }
}

export async function getAnuncios() {
  try {
    const result = await db.select().from(anuncios);
    return result;
  } catch (error) {
    console.error("Erro ao buscar anúncios:", error);
    return null;
  }
}

export async function getUsuarioAnuncios(
  usuarioId: string,
): Promise<Required<AnuncioDTO>[] | null> {
  try {
    const result = await db
      .select()
      .from(anuncios)
      .where(eq(anuncios.usuarioId, usuarioId));
    return result;
  } catch (error) {
    console.error("Erro ao buscar anuncios do usuario: ", error);
    return null;
  }
}

export async function getAnuncioById(
  anuncioId: string,
): Promise<Required<AnuncioDTO> | null> {
  try {
    const result = await db
      .select()
      .from(anuncios)
      .where(eq(anuncios.id, anuncioId));
    return result[0] || null;
  } catch (error) {
    console.error("Erro ao buscar anuncios do usuario: ", error);
    return null;
  }
}

export async function updateAnuncio(
  id: string,
  body: Partial<AnuncioDTO>,
): Promise<Required<AnuncioDTO> | null> {
  try {
    await db.update(anuncios).set(body).where(eq(anuncios.id, id));
    const updated = await db.select().from(anuncios).where(eq(anuncios.id, id));
    return updated[0] || null;
  } catch (error) {
    console.error("Erro ao atualizar anuncio: ", error);
    return null;
  }
}

export async function deleteAnuncio(id: string): Promise<boolean> {
  try {
    await db.delete(anuncios).where(eq(anuncios.id, id));
    return true;
  } catch (error) {
    console.error("Erro ao deletar anuncio: ", error);
    return false;
  }
}
