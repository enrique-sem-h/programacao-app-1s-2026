import type { UserDTO } from "@/types/types.ts";
import * as userRepository from "@/repositories/userRepository.ts";

export async function createUser(user: UserDTO): Promise<UserDTO | null> {
  return await userRepository.createUser(user);
}

export async function getUser(id: string): Promise<Partial<UserDTO> | null> {
  return await userRepository.getUser(id);
}

export async function getSensitiveUserData(
  id: string,
): Promise<Partial<UserDTO> | null> {
  return await userRepository.getSensitiveUserData(id);
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
