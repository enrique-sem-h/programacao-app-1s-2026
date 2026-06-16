import { db } from "@/../infra/database/index.ts";
import { usuarios } from "root/infra/database/schemas/usuariosSchema.ts";
import type { AuthUserDTO } from "@/types/types.ts";
import { eq } from "drizzle-orm";

export async function getUser(
	credentials: Partial<AuthUserDTO>,
): Promise<AuthUserDTO | null> {
	try {
		const [users] = await db
			.select({
				id: usuarios.id,
				email: usuarios.email,
				nome: usuarios.nome,
				senha: usuarios.senha,
				cpf: usuarios.cpf,
				endereco: usuarios.endereco,
				telefone: usuarios.telefone,
			})
			.from(usuarios)
			.where(eq(usuarios.email, credentials.email!));
		return users || null;
	} catch (error) {
		console.error("Error fetching user:", error);
		return null;
	}
}
