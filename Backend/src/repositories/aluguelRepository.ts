import { db } from "@/../infra/database/index.ts";
import { alugueis } from "root/infra/database/schemas/alugueisSchema.ts";
import { anuncios } from "root/infra/database/schemas/anunciosSchema.ts";
import { fotoAnuncios } from "root/infra/database/schemas/anunciosSchema.ts";
import { eq, and } from "drizzle-orm";

export async function create(data: typeof alugueis.$inferInsert) {
  await db.insert(alugueis).values(data);
  const result = await db
    .select()
    .from(alugueis)
    .where(eq(alugueis.id, data.id!));
  return result[0] ?? null;
}

export async function getByLocatario(locatarioId: string) {
    const result = await db
      .select({
        id: alugueis.id,
        status: alugueis.status,
        valorTotal: alugueis.valorTotal,
        dataInicio: alugueis.dataInicio,
        dataFim: alugueis.dataFim,
        anuncioId: alugueis.anuncioId,
        titulo: anuncios.titulo,
        fotoPrincipal: fotoAnuncios.url,
      })
      .from(alugueis)
      .leftJoin(anuncios, eq(alugueis.anuncioId, anuncios.id))
      .leftJoin(fotoAnuncios, and(
        eq(fotoAnuncios.anuncioId, anuncios.id),
        eq(fotoAnuncios.principal, true)
      ))
      .where(eq(alugueis.locatarioId, locatarioId));
  
    const seen = new Set();
    return result.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }

export async function updateStatus(id: string, status: string) {
  await db.update(alugueis).set({ status } as any).where(eq(alugueis.id, id));
}