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
  cpf: string;
  endereco: string;
  telefone: string;
};

export type CreateAnuncioDTO = {
  id?: string;
  titulo: string;
  descricao: string;
  categoria:
    | "Moda e Acessórios"
    | "Eletrônicos"
    | "Beleza e Cuidados"
    | "Casa e decoração"
    | "Animais e Acessórios";
  valorDiario: number;
  caucao: number;
  usuarioId: string;
};

export type CreateFotoAnuncioDTO = {
  anuncioId: string;
  url: string;
  ordem: number;
  principal: boolean;
};