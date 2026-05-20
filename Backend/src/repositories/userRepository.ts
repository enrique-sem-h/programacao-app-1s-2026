import { db } from "@/../infra/database/index.ts";
import { usuarios } from "@/../infra/database/schemas/UserSchema.ts";
import type { GetUserDTO, CreateUserDTO, UpdateUserDTO } from "@/types.ts";
import { eq } from "drizzle-orm";

export async function createUser(user: CreateUserDTO): Promise<CreateUserDTO> {
  // create user in database
  await db.insert(usuarios).values(user);
  return user;
}

export async function getUser(id: string): Promise<GetUserDTO | null> {
  try {
    const users = await db
      .select({
        id: usuarios.id,
        nome: usuarios.nome,
        email: usuarios.email,
        rep: usuarios.rep,
        saldo: usuarios.saldo,
      })
      .from(usuarios)
      .where(eq(usuarios.id, id));
    return users[0] || null;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

export async function updateUser(
  userId: string,
  updatedData: UpdateUserDTO,
): Promise<GetUserDTO | null> {
    try {
        await db.update(usuarios).set(updatedData).where(eq(usuarios.id, userId));
        return getUser(userId);
    } catch (err) {
        console.error("Error updating user: ", err);
        return null;
    }
}
