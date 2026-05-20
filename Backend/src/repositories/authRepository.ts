import { db } from "@/../infra/database/index.ts";
import { usuarios } from "@/../infra/database/schemas/UserSchema.ts";
import type { AuthUserDTO } from "@/types/types.ts";
import { eq } from "drizzle-orm";

export async function getUser(
  credentials: Partial<AuthUserDTO>,
): Promise<AuthUserDTO | null> {
  try {
    const users = await db
      .select({
        id: usuarios.id,
        email: usuarios.email,
        nome: usuarios.nome,
        senha: usuarios.senha,
      })
      .from(usuarios)
      .where(eq(usuarios.email, credentials.email!));
    return users[0] || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
