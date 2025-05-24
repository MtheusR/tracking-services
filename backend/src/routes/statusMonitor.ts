// src/routes/monitor.routes.ts
import { Router } from 'express';
import { statusMap } from './tracking/monitorRunner';

const router = Router();

router.get('/status', (_req, res) => {
	const lista: any[] = [];

	for (const [key, statusObj] of statusMap.entries()) {
		const [projeto, dominio] = key.split('-');

		for (const tipo of Object.keys(statusObj)) {
			const item = statusObj[tipo];
			lista.push({
				projeto: projeto.trim(),
				dominio: dominio.trim(),
				tipo,
				resposta: item.valor,
				horario: new Date(item.horario).toLocaleString('pt-BR'),
			});
		}
	}

	res.json(lista);
});

export default router;
