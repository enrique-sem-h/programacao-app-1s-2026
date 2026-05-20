import type { Request, Response } from "express";
import * as authService from "@/services/authService.ts";

export async function create(req: Request, res: Response) {
    // Fazer a validação dos dados
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    const fail = (msg: string, status = 400) => {
      res.status(status).json({ error: msg });
    };

    try {
      const { fields, files } = await new Promise<{
        fields: formidable.Fields;
        files: formidable.Files;
      }>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve({ fields, files });
        });
      });

      const getField = (key: string) =>
        Array.isArray(fields[key]) ? fields[key]?.[0] : fields[key];

      const user = getField("usuario");
      const fotos = [files.fotos].flat().filter(Boolean) as formidable.File[];
      const titulo = getField("titulo");
      const descricao = getField("descricao");
      const categoria = getField("categoria");
      const valorDiario = Number(getField("valorDiario"));
      const caucao = Number(getField("caucao"));

      log("fotos", fotos);
      log("fields", fields);
      log("usuario", user);

      if (!user || typeof user !== "string") {
        return fail("usuário não autorizado", 401);
      }
      if (fotos.length < 3)
        return fail("Tente novamente! Fotos não preenchidas ou inválidas");
      if (!titulo) return fail("Tente novamente! Título não preenchido");
      if (!descricao) return fail("Tente novamente! Descricao nao preenchida");
      if (
        !categoria ||
        !(anuncios.categoria.enumValues as any).includes(categoria)
      ) {
        return fail("Tente novamente! Categoria não preenchida ou inválida");
      }
      if (!valorDiario || Number(valorDiario) < 0)
        return fail("Tente novamente! Valor não preenchido ou inválido");
      if (!caucao || Number(caucao) < 0)
        return fail("Tente novamente! Valor cação não preenchido ou inválido");

      let usuarioParse = {} as userParse;
      try {
        usuarioParse = JSON.parse(user!) as userParse;
      } catch (error) {
        return fail("Formato corrompido");
      }

      const anuncioDto = {
        titulo,
        descricao,
        categoria,
        valorDiario,
        caucao,
        usuarioId: usuarioParse.id,
      } as CreateAnuncioDTO;

      console.log("anuncioDto", anuncioDto);

      const anuncio = await this.anuncioService.create(anuncioDto, fotos);

      return res.status(201).json({ data: anuncio });
    } catch (error) {
      return fail("Erro no processamento do formulario", 500);
    }
  }