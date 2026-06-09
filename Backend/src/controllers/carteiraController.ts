import type { Request, Response } from "express";
import { db } from "@/../infra/database/index.ts";
import { alugueis } from "root/infra/database/schemas/alugueisSchema.ts";
import { anuncios } from "root/infra/database/schemas/anunciosSchema.ts";
import { eq, and } from "drizzle-orm";

export async function getCarteira(req: Request, res: Response) {
  try {
    const userId = req.user.id;

    const alugueisComoLocatario = await db
      .select({
        id: alugueis.id,
        valorTotal: alugueis.valorTotal,
        status: alugueis.status,
        dataInicio: alugueis.dataInicio,
        dataFim: alugueis.dataFim,
        titulo: anuncios.titulo,
      })
      .from(alugueis)
      .leftJoin(anuncios, eq(alugueis.anuncioId, anuncios.id))
      .where(eq(alugueis.locatarioId, userId));

    const alugueisComoLocador = await db
      .select({
        id: alugueis.id,
        valorTotal: alugueis.valorTotal,
        status: alugueis.status,
        dataInicio: alugueis.dataInicio,
        dataFim: alugueis.dataFim,
        titulo: anuncios.titulo,
      })
      .from(alugueis)
      .leftJoin(anuncios, eq(alugueis.anuncioId, anuncios.id))
      .where(
        and(
          eq(anuncios.usuarioId, userId),
          eq(alugueis.status, "ativo")
        )
      );

    const totalGasto = alugueisComoLocatario
      .filter((a) => a.status !== "cancelado" && a.status !== "pendente")
      .reduce((acc, a) => acc + Number(a.valorTotal), 0);

    const totalGanho = alugueisComoLocador
      .reduce((acc, a) => acc + Number(a.valorTotal), 0);

    const alugueisAtivos = alugueisComoLocatario.filter(
      (a) => a.status === "ativo" || a.status === "em_uso"
    ).length;

    const historico = [
      ...alugueisComoLocatario.map((a) => ({ ...a, tipo: "gasto" as const })),
      ...alugueisComoLocador.map((a) => ({ ...a, tipo: "ganho" as const })),
    ].sort((a, b) => a.dataInicio.localeCompare(b.dataInicio));

    return res.status(200).json({
      totalGanho,
      totalGasto,
      alugueisAtivos,
      historico,
    });
  } catch (error) {
    console.error("Erro ao buscar carteira:", error);
    return res.status(500).json({ error: "Erro ao buscar carteira" });
  }
}