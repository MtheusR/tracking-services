import { api } from '@/lib/axios';

export interface StatusDetalhado {
	resposta: boolean;
	tipo: string;
	projeto: string;
	dominio: string;
	horario: string;
}

export async function getStatusDetalhado(): Promise<StatusDetalhado[]> {
	const response = await api.get('/monitor/status');
	return response.data;
}
