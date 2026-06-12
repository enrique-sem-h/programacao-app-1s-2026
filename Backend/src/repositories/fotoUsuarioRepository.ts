import type { FotoUsuarioDTO } from "@/types/types.ts";
import { fotoUsuarios } from "@/../infra/database/schemas/usuariosSchema.ts";
import { db } from "@/../infra/database/index.ts";
import { eq } from "drizzle-orm";

export async function create(
	body: FotoUsuarioDTO,
): Promise<FotoUsuarioDTO | null> {
	// Chamar o Drizzle para subir url da foto
	try {
		await db.insert(fotoUsuarios).values(body);
		return body;
	} catch (error) {
		console.error("Erro ao criar foto do anúncio:", error);
		return null;
	}
}

export async function getFoto(usuarioId: string): Promise<string | null> {
	try {
		const fotos = await db
			.select({
				url: fotoUsuarios.url,
			})
			.from(fotoUsuarios)
			.where(eq(fotoUsuarios.usuarioId, usuarioId));
		return fotos[0]?.url ?? null;
	} catch (error) {
		console.error("Erro ao buscar foto do usuario", error);
		return null;
	}
}

export async function deleteFoto(url: string): Promise<{ success: boolean }> {
	try {
		const result = await db
			.delete(fotoUsuarios)
			.where(eq(fotoUsuarios.url, url));

		return { success: true };
	} catch (error) {
		console.error("Erro ao apagar foto do usuario", error);
		return { success: false };
	}
}
