import type {
  GetUserDTO,
  CreateUserDTO,
  UpdateUserDTO,
} from "@/types/types.ts";
import * as userRepository from "@/repositories/userRepository.ts";

export async function createUser(
  user: CreateUserDTO,
): Promise<CreateUserDTO | null> {
  return await userRepository.createUser(user);
}

export async function getUser(id: string): Promise<GetUserDTO | null> {
  return await userRepository.getUser(id);
}

export async function getSensitiveUserData(
  id: string,
): Promise<Partial<CreateUserDTO> | null> {
  return await userRepository.getSensitiveUserData(id);
}

export async function updateUser(
  userId: string,
  updatedData: UpdateUserDTO,
): Promise<GetUserDTO | null> {
  return await userRepository.updateUser(userId, updatedData);
}
