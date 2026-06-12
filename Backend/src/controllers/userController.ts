import type { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt-ts";
import uuid from "crypto";
import * as userService from "../services/userService.ts";
import type { UserDTO } from "@/types/types.ts";

export async function signup(req: Request, res: Response) {
	try {
		const foto = req.file as Express.Multer.File;

		let user: UserDTO = req.body.user;

		if (await userService.getUser({ email: user.email })) {
			return res.status(400).json({ error: "Email already in use" });
		}

		// hash the password
		user.senha = await bcrypt.hash(user.senha, 12);

		// generate user id
		user.id = uuid.randomUUID();

		let result = await userService.createUser(user, foto);

		if (!result)
			return res
				.status(500)
				.json({ error: "Unable to create user in database" });

		return res
			.status(201)
			.json({ message: "User created with id: " + user.id });
	} catch (error) {
		console.error("Erro detalhado:", error);
		return res.status(500).json("erro no processamento do formulario");
	}
}

export async function getUser(req: Request, res: Response) {
	const id = req.params.id;
	const authUser = req.user.id;

	if (authUser === id) {
		const user = await userService.getSensitiveUserData(authUser);

		if (user) {
			user.cpf = maskCPF(user.cpf!);
			return res.status(200).json(user);
		}

		return res.status(404).json({ error: "User not found" });
	}

	if (typeof id === "string") {
		const user = await userService.getUser({ id });

		if (user) {
			return res.status(200).json(user);
		}

		return res.status(404).json({ error: "User not found" });
	}

	return res.status(400).json({ error: "ID invalido" });
}

export async function updateUser(req: Request, res: Response) {
	const userId = req.user.id;
	const updatedData = req.body as Partial<UserDTO>;

	const user = await userService.getUser({ id: userId });

	if (!user) {
		return res.status(404).json("Usuario nao encontrado");
	}

	if (updatedData && updatedData.senha) {
		updatedData.senha = await bcrypt.hash(updatedData.senha, 12);
	}

	const foto = req.file as Express.Multer.File;

	const result = await userService.updateUser(userId, updatedData, foto);

	if (result) {
		return res
			.status(200)
			.json({ message: "User updated successfully", result });
	}

	return res
		.status(500)
		.json({ error: "internal error, couldn't update user" });
}

export async function deleteUser(req: Request, res: Response) {
	const userId = req.user.id;

	const result = await userService.deleteUser(userId);

	if (result) {
		return res.status(200).json({ message: "User deleted successfully" });
	}

	return res
		.status(500)
		.json({ error: "Internal error, couldn't delete user" });
}

function maskCPF(cpf: string): string {
	return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.***.***-$4");
}
