import type { CreateAnuncioDTO } from "@/types/types.ts";
import { anuncios } from "@/../infra/database/schemas/anunciosSchema.ts";
import { db } from "@/../infra/database/index.ts";

export async function create(body: CreateAnuncioDTO): Promise<CreateAnuncioDTO | null> {
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
