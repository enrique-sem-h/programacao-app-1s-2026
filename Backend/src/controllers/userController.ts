import type { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt-ts";
import uuid from "crypto";
import * as userService from "../services/userService.ts";
import type { UserDTO } from "@/types/types.ts";

export async function signup(req: Request, res: Response) {
  const fail = (msg: string, status = 400) => {
    res.status(status).json({ error: msg });
  };

  try {
    const foto = req.file as Express.Multer.File;
    if (!foto) return fail("Bad Request: Foto nao recebida");

    let user: UserDTO =
      typeof req.body.user === "string"
        ? JSON.parse(req.body.user)
        : req.body.user;

    if (!user.nome) {
      return fail("Bad Request: nome invalido");
    }

    if (!user.cpf) {
      return fail("Bad Request: cpf invalido");
    }

    if (!user.email) {
      return fail("Bad Request: email invalido");
    }

    if (!user.senha) {
      return fail("Bad Request: senha invalida");
    }

    if (!user.endereco) {
      return fail("Bad Request: endereco invalido");
    }

    if (!user.telefone) {
      return fail("Bad Request: telefone invalido");
    }

    // hash the password
    user.senha = await bcrypt.hash(user.senha, 12);

    // generate user id
    user.id = uuid.randomUUID();

    let result = await userService.createUser(user, foto);

    if (!result)
      return res
        .status(500)
        .json({ error: "unable to create user in database" });

    return res
      .status(201)
      .json({ message: "User created with id: " + user.id });
  } catch (error) {
    console.error("Erro detalhado:", error);
    return fail("erro no processamento do formulario", 500);
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
  const userId = req.user.id;
  const updatedData = {} as Partial<UserDTO>;

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

export async function deleteUser(req: Request, res: Response) {
  const userId = req.user.id;

  const result = await userService.deleteUser(userId);

  if (result) {
    return res.status(200).json({ message: "User deleted successfully" });
  }

  return res
    .status(500)
    .json({ error: "Internal error, couldn't delete user" });
}

function maskCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "***.***.***-$4");
}
