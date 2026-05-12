import type { Request, Response } from "express";
import { db } from "root/infra/database/index.ts";
import { eq } from "drizzle-orm";
import { usuarios } from "root/infra/database/schemas/UserSchema.ts";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt-ts";

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await db
      .select({
        id: usuarios.id,
        email: usuarios.email,
        senha: usuarios.senha,
      })
      .from(usuarios)
      .where(eq(usuarios.email, email));

    if (!user || user.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(senha, user[0]!.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user[0]!.id, email: user[0]!.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
