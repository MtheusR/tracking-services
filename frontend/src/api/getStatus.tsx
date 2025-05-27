import { api } from '@/lib/axios';

export type StatusItem = {
	projeto: string;
	dominio: string;
	tipo: string;
	resposta: boolean | null | undefined;
	horario: string;
};

export type StatusResumo = {
	totalProjetos: number;
	totalOk: number;
	totalComErro: number;
};

export type StatusResponse = {
	projetos: StatusItem[];
	resumo: StatusResumo;
};

export async function getStatusDetalhado(): Promise<StatusResponse> {
	const response = await api.get<StatusResponse>('/monitor/status');
	return response.data;
}
