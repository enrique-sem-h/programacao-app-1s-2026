import type { CreateFotoAnuncioDTO } from "@/types/types.ts";
import { fotoAnuncios } from "@/../infra/database/schemas/anunciosSchema.ts";
import { db } from "@/../infra/database/index.ts";
import { eq } from "drizzle-orm";

export async function create(body: CreateFotoAnuncioDTO): Promise<CreateFotoAnuncioDTO | null> {
    // Chamar o Drizzle para subir url da foto
    try {
        await db.insert(fotoAnuncios).values(body);
        return body;
    } catch (error) {
        console.error("Erro ao criar foto do anúncio:", error);
        return null;
    }
  }

export async function getFotos(anuncioId: string) {
    return db
      .select()
      .from(fotoAnuncios)
      .where(eq(fotoAnuncios.anuncioId, anuncioId))
      .orderBy(fotoAnuncios.ordem);
}

