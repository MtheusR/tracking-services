import { api } from '@/lib/axios';

export async function getStatus() {
	const response = await api.get('/monitor/status');
	return response.data;
}
