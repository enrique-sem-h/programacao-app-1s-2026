import cloudinary from "@/../infra/cloudinary/cloudinary.ts";
import * as FotoAnuncioRepository from "@/repositories/fotoAnuncioRepository.ts";
import type { AnuncioDTO, FotoAnuncioDTO } from "@/types/types.ts";
import path from "node:path";
import fs from "fs/promises";

async function upload(
  idAnuncio: string,
  file: Express.Multer.File,
  ordem: number,
  principal: boolean,
): Promise<FotoAnuncioDTO | null> {
  const buffer = file.buffer;
  let fileUrl = "";

  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), "/uploads", "/userPhotos");
    await fs.mkdir(dir, { recursive: true });

    const name = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(dir, name);

    await fs.writeFile(filePath, buffer);

    fileUrl = `/uploads/anuncioPhotos/${idAnuncio}/${name}`;
  } else {
    // upload para o Cloudinary
    fileUrl = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `anuncios/${idAnuncio}`,
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

  const dto: FotoAnuncioDTO = {
    anuncioId: idAnuncio,
    url: fileUrl,
    ordem,
    principal,
  };

  // save das fotos no banco
  const result = await FotoAnuncioRepository.create(dto);
  return result;
}

export async function bulkUpload(
  idAnuncio: string,
  files: Express.Multer.File[],
) {
  await Promise.all(
    files.map((file, index) => {
      return upload(idAnuncio, file, index, index === 0);
    }),
  );
}

export async function getFotos(anuncioId: string) {
  const fotos = await FotoAnuncioRepository.getFotos(anuncioId);
  return fotos;
}
