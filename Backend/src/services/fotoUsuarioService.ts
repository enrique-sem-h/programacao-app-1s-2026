import cloudinary from "@/../infra/cloudinary/cloudinary.ts";
import * as FotoUsuarioRepository from "@/repositories/fotoUsuarioRepository.ts";
import type { FotoUsuarioDTO } from "@/types/types.ts";

export async function upload(
  usuarioId: string,
  file: Express.Multer.File,
): Promise<FotoUsuarioDTO | null> {
  const buffer = file.buffer;

  // upload para o Cloudinary
  const cloudinaryURL = await new Promise<string>((resolve, reject) => {
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

  const dto: FotoUsuarioDTO = {
    usuarioId: usuarioId,
    url: cloudinaryURL,
  };

  // save das fotos no banco
  const result = await FotoUsuarioRepository.create(dto);
  return result;
}

export async function getFoto(usuarioId: string) {
  const foto = await FotoUsuarioRepository.getFoto(usuarioId);
  return foto;
}
