export interface User {
	id: string;
	nome: string;
	email: string;
	cpf?: string;
	endereco?: string;
	telefone?: string;
	foto: string;
}

export interface FotoAnuncio {
	id: string;
	url: string;
	ordem: number;
	principal: boolean;
	anuncioId: string;
}

export interface Anuncio {
	id: string;
	titulo: string;
	descricao: string;
	categoria: string;
	valorDiario: number;
	caucao: number;
	usuarioId: string;
	fotos: FotoAnuncio[];
}

export interface AnunciosResponse {
	data: Anuncio[];
}

/** Retorna a foto marcada como principal, ou a primeira disponível. */
export const getFotoPrincipal = (fotos: FotoAnuncio[]): string | null =>
	(fotos.find((f) => f.principal) ?? fotos[0])?.url ?? null;
