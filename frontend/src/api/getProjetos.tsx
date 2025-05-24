import { api } from '@/lib/axios';

// src/types/projeto.ts
export interface Subprojeto {
	dominio: string;
	ip: string;
	porta: string;
	type: string;
}

export interface Projeto {
	nome_do_projeto: string;
	descricao: string;
	subprojetos: Subprojeto[];
}

export async function getProjetos(): Promise<Projeto[]> {
	const response = await api.get<Projeto[]>('/monitor/projetos');
	return response.data;
}
