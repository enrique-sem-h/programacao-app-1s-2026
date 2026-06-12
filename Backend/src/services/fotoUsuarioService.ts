import cloudinary from "@/../infra/cloudinary/cloudinary.ts";
import * as FotoUsuarioRepository from "@/repositories/fotoUsuarioRepository.ts";
import type { FotoUsuarioDTO } from "@/types/types.ts";
import path from "node:path";
import fs from "fs/promises";

export async function upload(
	usuarioId: string,
	file: Express.Multer.File,
): Promise<FotoUsuarioDTO | null> {
	const buffer = file.buffer;
	let fileUrl = "";

	if (process.env.NODE_ENV !== "production") {
		const dir = path.join(
			process.cwd(),
			"/uploads",
			"/userPhotos",
			`/${usuarioId}`,
		);
		await fs.mkdir(dir, { recursive: true });

		const name = `${Date.now()}-${file.originalname}`;
		const filePath = path.join(dir, name);

		await fs.writeFile(filePath, buffer);

		fileUrl = `/uploads/userPhotos/${usuarioId}/${name}`;
	} else {
		// upload para o Cloudinary
		fileUrl = await new Promise<string>((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					folder: `usuarios/${usuarioId}`,
				},
				(error, result) => {
					if (error || !result) {
						reject(error);
					}
					resolve(result!.secure_url);
				},
			);
			uploadStream.end(buffer);
		});
	}

	const dto: FotoUsuarioDTO = {
		usuarioId: usuarioId,
		url: fileUrl,
	};

	// save das fotos no banco
	const result = await FotoUsuarioRepository.create(dto);
	return result;
}

export async function getFoto(usuarioId: string) {
	const foto = await FotoUsuarioRepository.getFoto(usuarioId);
	return foto;
}

export async function deleteFoto(url: string): Promise<{ success: boolean }> {
	if (process.env.NODE_ENV !== "production") {
		await fs.unlink(path.join(process.cwd(), url));
		return await FotoUsuarioRepository.deleteFoto(url);
	} else {
		const urlParts = url.split("/upload/");

		if (urlParts.length < 2) {
			console.error("Unable to get public id for url: ", url);
			return { success: false };
		}

		const publicId = urlParts[1]
			.replace(/^v\d+\//, "")
			.replace(/\.[^/.]+$/, "");

		try {
			const result = await cloudinary.uploader.destroy(publicId, {
				invalidate: true,
			});

			const cloudinarySuccess =
				result.resul === "ok" || result.result === "not found";

			if (!cloudinarySuccess) {
				return { success: false };
			}

			return await FotoUsuarioRepository.deleteFoto(url);
		} catch (error) {
			console.error("Deletion failed: ", error);
			return { success: false };
		}
	}
}

export async function updateFoto(
	usuarioId: string,
	foto: Express.Multer.File,
): Promise<FotoUsuarioDTO | null> {
	const usuarioFoto = await getFoto(usuarioId);

	if (usuarioFoto) {
		await deleteFoto(usuarioFoto);
		return await upload(usuarioId, foto);
	}

	return null;
}
