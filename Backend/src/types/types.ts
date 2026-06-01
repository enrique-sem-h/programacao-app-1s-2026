export type UserDTO = {
  id?: string;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  endereco: string;
  telefone: string;
  rep?: number;
  saldo?: number;
  foto?: string
};

export type FotoUsuarioDTO = {
  usuarioId: string;
  url: string;
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

export type AnuncioDTO = {
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

export type FotoAnuncioDTO = {
  anuncioId: string;
  url: string;
  ordem: number;
  principal: boolean;
};
