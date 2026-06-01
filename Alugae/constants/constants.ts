export const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const MAX_PHOTOS = 7;

export const CATEGORIAS = [
  "Moda e Acessórios",
  "Eletrônicos",
  "Beleza e Cuidados",
  "Casa e decoração",
  "Animais e Acessórios",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];
