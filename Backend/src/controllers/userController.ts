import type { NextFunction, Request, Response } from "express";
import { db } from "root/infra/database/index.ts";
import { usuarios } from "root/infra/database/schemas/usuariosSchema.ts";
import * as bcrypt from "bcrypt-ts";
import uuid from "crypto";
import { eq } from "drizzle-orm";
import * as userService from "../services/userService.ts";
import type { CreateUserDTO, UpdateUserDTO } from "@/types/types.ts";

export async function signup(req: Request, res: Response) {
  // if body contains user
  if (req.body.user) {
    let user: CreateUserDTO = req.body.user;

    if (!user.nome) {
      return res.status(400).json({ error: "Bad Request: nome invalido" });
    }

    if (!user.cpf) {
      return res.status(400).json({ error: "Bad Request: cpf invalido" });
    }

    if (!user.email) {
      return res.status(400).json({ error: "Bad Request: email invalido" });
    }

    if (!user.senha) {
      return res.status(400).json({ error: "Bad Request: senha invalido" });
    }

    if (!user.endereco) {
      return res.status(400).json({ error: "Bad Request: endereco invalido" });
    }

    if (!user.telefone) {
      return res.status(400).json({ error: "Bad Request: telefone invalido" });
    }

    // hash the password
    user.senha = await bcrypt.hash(user.senha, 12);

    // generate user id
    user.id = uuid.randomUUID();

    let result = userService.createUser(user);

    if (!result)
      return res
        .status(500)
        .json({ error: "unable to create user in database" });

    return res
      .status(201)
      .json({ message: "User created with id: " + user.id });
  } else {
    // else return error
    return res.status(400).json({ error: "Invalid user data" });
  }
}

export async function getUser(req: Request, res: Response) {
  const id = req.params.id;
  const authUser = req.user.id;

  if (authUser && authUser === id) {
    const user = await userService.getSensitiveUserData(authUser);

    if (user) {
      user.cpf = maskCPF(user.cpf!);
      return res.status(200).json(user);
    }

    return res.status(404).json({ error: "User not found" });
  }

  if (id && typeof id === "string") {
    const user = await userService.getUser(id);

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(404).json({ error: "User not found" });
  }

  return res.status(400).json({ error: "ID invalido" });
}

export async function updateUser(req: Request, res: Response) {
  const userId = req.body.id;
  const updatedData = {} as UpdateUserDTO;

  if (req.body.senha) {
    updatedData.senha = await bcrypt.hash(req.body.senha, 12);
  }

  if (req.body.email) {
    updatedData.email = req.body.email;
  }

  if (req.body.endereco) {
    updatedData.endereco = req.body.endereco;
  }

  if (req.body.telefone) {
    updatedData.telefone = req.body.telefone;
  }

  const result = await userService.updateUser(userId, updatedData);

  if (result) {
    return res
      .status(200)
      .json({ message: "User updated successfully", result });
  }

  return res
    .status(500)
    .json({ error: "internal error, couldn't update user" });
}

function maskCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.***.***-$4");
}
