import type { Request, Response } from "express";
import { db } from "root/infra/database/index.ts";
import { eq } from "drizzle-orm";
import { usuarios } from "root/infra/database/schemas/UserSchema.ts";
import * as authService from "@/services/authService.ts";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt-ts";
import { error } from "node:console";

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await authService.getUser({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.cpf = user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.***.***-$4");

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
      cpf: user.cpf,
      endereco: user.endereco,
      telefone: user.telefone,
    },
  });
}
