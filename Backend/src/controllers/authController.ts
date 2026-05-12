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
    const users = await db
      .select({
        id: usuarios.id,
        email: usuarios.email,
        nome: usuarios.nome,
        senha: usuarios.senha,
      })
      .from(usuarios)
      .where(eq(usuarios.email, email));

    const user = users[0];

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );
    res.json({
      token,
      usuario: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
