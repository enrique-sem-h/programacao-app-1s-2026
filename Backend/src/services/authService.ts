import type { AuthUserDTO } from "@/types/types.ts";
import * as authRepository from "@/repositories/authRepository.ts";
import { error } from "node:console";
import * as FotoUsuarioService from "@/services/fotoUsuarioService.ts";

export async function getUser(
	credentials: Partial<AuthUserDTO>,
): Promise<AuthUserDTO | null> {
	if (!credentials.email) {
		throw new Error("Email required");
	}
	const user = await authRepository.getUser(credentials);

	if (user) {
		const userFoto = await FotoUsuarioService.getFoto(user.id!);

		if (userFoto) {
			return {
				...user,
				foto: userFoto,
			};
		}
	}

	console.error(
		"Nao foi possivel buscar usuario ou foto no banco de dados: ",
		error,
	);
	return null;
}
