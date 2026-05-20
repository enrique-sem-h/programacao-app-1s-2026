import type { AuthUserDTO } from "@/types.ts";
import * as authRepository from "@/repositories/authRepository.ts";

export async function getUser(
  credentials: Partial<AuthUserDTO>,
): Promise<AuthUserDTO | null> {
  if (!credentials.email) {
    throw new Error("Email required");
  }
  const user = await authRepository.getUser(credentials);
  return user;
}
