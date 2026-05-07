import type { Request, Response } from "express";
import { db } from "../utils/database/index.ts";
import { usuarios } from "../utils/database/schemas/UserSchema.ts";
import * as bcrypt from "bcrypt-ts";
import uuid from "crypto";
import { eq } from "drizzle-orm";

export async function signup(req: Request, res: Response) {
  // if body contains user
  if (req.body.user) {
    let user = req.body.user;

    // hash the password
    user.senha = await bcrypt.hash(user.senha, 12);

    // generate user id
    user.id = uuid.randomUUID();

    // create user in database
    try {
      await db.insert(usuarios).values(req.body.user);
      // return success
      res.status(201).json({ message: "User created with id: " + user.id });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    // else return error
    res.status(400).json({ error: "Invalid user data" });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await db
      .select({
        id: usuarios.id,
        nome: usuarios.nome,
        rep: usuarios.rep,
      })
      .from(usuarios);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export async function updateUser(req: Request, res: Response) {
  const userId = req.body.id;
  const updatedData: { [key: string]: string } = {};

  if (req.body.senha) {
    updatedData.senha = await bcrypt.hash(req.body.senha, 12);
  }

  if (req.body.nome) {
    updatedData.nome = req.body.nome;
  }

  if (req.body.email) {
    updatedData.email = req.body.email;
  }

  if (req.body.endereco) {
    updatedData.endereco = req.body.endereco;
  }

  try {
    await db.update(usuarios).set(updatedData).where(eq(usuarios.id, userId));
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
