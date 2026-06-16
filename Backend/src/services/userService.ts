import type { FotoUsuarioDTO, UserDTO } from "@/types/types.ts";
import * as userRepository from "@/repositories/userRepository.ts";
import * as FotoUsuarioService from "@/services/fotoUsuarioService.ts";
import { randomUUID } from "node:crypto";
import { error } from "node:console";

export async function createUser(
	user: UserDTO,
	foto: Express.Multer.File,
): Promise<UserDTO | null> {
	user.id = randomUUID();
	const created = await userRepository.createUser(user);

	if (created) {
		await FotoUsuarioService.upload(user.id, foto);
		return user;
	}

	return null;
}

export async function getUser({
	id,
	email,
}: {
	id?: string;
	email?: string;
}): Promise<Partial<UserDTO> | null> {
	if (!id && !email) {
		console.error("either ID or email must be provided");
		return null;
	}

	const user = await userRepository.getUser({ id, email });

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

export async function getSensitiveUserData(
	id: string,
): Promise<Partial<UserDTO> | null> {
	const userData = await userRepository.getSensitiveUserData(id);

	if (!userData) return null;

	try {
		const userFoto = await FotoUsuarioService.getFoto(id);
		return { ...userData, foto: userFoto ?? undefined };
	} catch {
		return userData;
	}
}

export async function updateUser(
	usuarioId: string,
	updatedData?: Partial<UserDTO>,
	foto?: Express.Multer.File,
): Promise<Partial<UserDTO> | null> {
	if (!updatedData && !foto) {
		console.error("Either a photo or field must be provided");
		return null;
	}

	let updated: Partial<UserDTO | null> = null;
	let url: Partial<FotoUsuarioDTO | null> = null;

	if (updatedData && Object.keys(updatedData).length !== 0) {
		updated = await userRepository.updateUser(usuarioId, updatedData);
	}

	if (foto) {
		url = await FotoUsuarioService.updateFoto(usuarioId, foto);
	}
	
	return {
		...updated,
		foto: url?.url,
	};
}

export async function deleteUser(userId: string): Promise<Boolean | null> {
	const result = await userRepository.deleteUser(userId);

	if (result) {
		const url = await FotoUsuarioService.getFoto(userId);
		if (url) return (await FotoUsuarioService.deleteFoto(url)).success;
	}

	return null;
}
