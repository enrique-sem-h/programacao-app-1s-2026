export type CreateUserDTO = {
  id?: string;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  endereco: string;
  telefone: string;
  rep?: number;
  saldo?: number;
};

export type UpdateUserDTO = {
  email: string;
  senha: string;
  endereco: string;
  telefone: string;
};

export type GetUserDTO = {
  id: string;
  nome: string;
  email: string;
  rep: number;
  saldo: number;
};

export type AuthUserDTO = {
  id: string;
  nome: string;
  email: string;
  senha: string;
};
