import { z } from "zod";
import * as ImagePicker from "expo-image-picker";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

export const RegisterSchema = z
  .object({
    nome: z.string().trim().min(3),
    cpf: z.string().trim().min(11).max(14),
    email: z.email(),
    senha: z
      .string()
      .min(8)
      .regex(passwordRegex),
    confirmarSenha: z.string(),
    endereco: z.string().min(10),
    telefone: z
      .string()
      .min(8)
      .max(11)
      .regex(/^[0-9]+$/),

    foto: z
      .custom<ImagePicker.ImagePickerAsset>()
      .refine((value) => value != null, {
        message: "Selecione uma foto",
      }),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    path: ["confirmarSenha"],
    message: "As senhas não coincidem",
  });
