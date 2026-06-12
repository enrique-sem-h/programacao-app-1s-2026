import { db } from "@/../infra/database/index.ts";
import { usuarios } from "root/infra/database/schemas/usuariosSchema.ts";
import type { UserDTO } from "@/types/types.ts";
import { eq } from "drizzle-orm";

export async function createUser(user: UserDTO): Promise<UserDTO | null> {
	// create user in database
	try {
		await db.insert(usuarios).values(user);
		return user;
	} catch (err) {
		console.error("Error creating user: ", err);
		return null;
	}
}

export async function getSensitiveUserData(
	id: string,
): Promise<Partial<UserDTO> | null> {
	try {
		const users = await db
			.select({
				id: usuarios.id,
				nome: usuarios.nome,
				cpf: usuarios.cpf,
				email: usuarios.email,
				endereco: usuarios.endereco,
				telefone: usuarios.telefone,
			})
			.from(usuarios)
			.where(eq(usuarios.id, id));
		return users[0] || null;
	} catch (err) {
		console.error("Error fetching sensitive user data: ", err);
		return null;
	}
}

export async function getUser({
	id,
	email,
}: {
	id?: string;
	email?: string;
}): Promise<Partial<UserDTO> | null> {
	try {
		if (!id && !email) {
			throw new Error("Either id or email must be provided");
		}

		const users = await db
			.select({
				id: usuarios.id,
				nome: usuarios.nome,
				email: usuarios.email,
				rep: usuarios.rep,
			})
			.from(usuarios)
			.where(id ? eq(usuarios.id, id) : eq(usuarios.email, email!));
		return users[0] || null;
	} catch (err) {
		console.error("Error fetching user:", err);
		return null;
	}
}

export async function updateUser(
	userId: string,
	updatedData: Partial<UserDTO>,
): Promise<Partial<UserDTO> | null> {
	try {
		await db.update(usuarios).set(updatedData).where(eq(usuarios.id, userId));
		return {
			id: userId,
			...updatedData,
		};
	} catch (err) {
		console.error("Error updating user: ", err);
		return null;
	}
}

export async function deleteUser(userId: string): Promise<Boolean | null> {
	try {
		await db.delete(usuarios).where(eq(usuarios.id, userId));
		return true;
	} catch (err) {
		console.error("Error deleting user: ", err);
		return null;
	}
}
