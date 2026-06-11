import type { Request, Response } from "express";
import * as pagamentoService from "@/services/pagamentoService.ts";
import * as aluguelRepository from "@/repositories/aluguelRepository.ts";
import * as anuncioRepository from "@/repositories/anuncioRepository.ts";
import * as userService from "@/services/userService.ts";
import { randomUUID } from "node:crypto";

export async function criarPagamento(req: Request, res: Response) {
  try {
    const { anuncioId, dataInicio, dataFim, valorTotal, caucao } = req.body;
    const locatarioId = req.user.id;

    if (!anuncioId || !dataInicio || !dataFim || !valorTotal) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const usuario = await userService.getSensitiveUserData(locatarioId);
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    const anuncio = await anuncioRepository.getAnuncioById(anuncioId);
    if (!anuncio) return res.status(404).json({ error: "Anúncio não encontrado" });

    const aluguelId = randomUUID();
    const cpfLimpo = usuario.cpf!.replace(/\D/g, "");
    const telefoneLimpo = "+55" + usuario.telefone!.replace(/\D/g, "");

    const { cobrancaId, url } = await pagamentoService.criarCobrancaPix(
      valorTotal,
      aluguelId,
      usuario.nome!,
      usuario.email!,
      cpfLimpo,
      telefoneLimpo,
    );

    await aluguelRepository.create({
      id: aluguelId,
      anuncioId,
      locatarioId,
      dataInicio,
      dataFim,
      valorTotal,
      caucao: caucao ?? 0,
      status: "pendente",
      stripePaymentIntentId: cobrancaId,
      metodoPagamento: "PIX",
    });

    return res.status(201).json({ url, aluguelId, locadorId: anuncio.usuarioId });
  } catch (error: any) {
    console.error("Erro ao criar pagamento:", error?.response?.data ?? error);
    return res.status(500).json({ error: "Erro ao criar pagamento" });
  }
}

export async function confirmarPagamento(req: Request, res: Response) {
  try {
    const { aluguelId } = req.body;
    await aluguelRepository.updateStatus(aluguelId, "ativo");
    return res.status(200).json({ message: "Pagamento confirmado!" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao confirmar pagamento" });
  }
}

export async function getMeusAlugueis(req: Request, res: Response) {
  try {
    const locatarioId = req.user.id;
    const alugueis = await aluguelRepository.getByLocatario(locatarioId);
    return res.status(200).json({ alugueis });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar aluguéis" });
  }
}