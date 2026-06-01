import type { UserDTO } from "@/types/types.ts";
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

export async function getUser(id: string): Promise<Partial<UserDTO> | null> {
  const user = await userRepository.getUser(id);

  const userFoto = await FotoUsuarioService.getFoto(id);

  if (user && userFoto) {
    return {
      ...user,
      foto: userFoto,
    };
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

  const userFoto = await FotoUsuarioService.getFoto(id);

  if (userData && userFoto) {
    return {
      ...userData,
      foto: userFoto,
    };
  }

  console.error(
    "Nao foi possivel buscar usuario ou foto no banco de dados: ",
    error,
  );
  return null;
}

export async function updateUser(
  userId: string,
  updatedData: Partial<UserDTO>,
): Promise<Partial<UserDTO> | null> {
  return await userRepository.updateUser(userId, updatedData);
}

export async function deleteUser(userId: string): Promise<Boolean | null> {
  return await userRepository.deleteUser(userId);
}
