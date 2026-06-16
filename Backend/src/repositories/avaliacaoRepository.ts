import { db } from "@/../infra/database/index.ts";
import { avaliacoes } from "root/infra/database/schemas/avaliacoesSchema.ts";
import { eq } from "drizzle-orm";

export async function create(data: typeof avaliacoes.$inferInsert) {
  await db.insert(avaliacoes).values(data);
}

export async function getByAluguel(aluguelId: string) {
  const result = await db
    .select()
    .from(avaliacoes)
    .where(eq(avaliacoes.aluguelId, aluguelId));
  return result[0] ?? null;
}