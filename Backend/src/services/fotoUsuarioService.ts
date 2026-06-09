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
    const dir = path.join(process.cwd(), "/uploads", "/userPhotos");
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
