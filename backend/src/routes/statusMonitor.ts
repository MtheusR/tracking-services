import { Router } from 'express';
import { statusMap } from './tracking/monitorRunner';

type StatusTipo = 'ping' | 'http' | 'ssl';

const router = Router();

router.get('/status', (_req, res) => {
	const lista: {
		projeto: string;
		dominio: string;
		tipo: StatusTipo;
		resposta: boolean | undefined;
		horario: string;
	}[] = [];

	const projetoResumo = new Map<string, { total: number; erros: number }>();

	for (const [key, statusObj] of statusMap.entries()) {
		const [projeto, dominio] = key.split('-');

		let definidos = 0;
		let erros = 0;

		for (const tipo of Object.keys(statusObj) as StatusTipo[]) {
			const item = statusObj[tipo];
			const valor = item?.valor;

			if (valor !== undefined) {
				definidos++;
				if (!valor) erros++;
			}

			lista.push({
				projeto: projeto.trim(),
				dominio: dominio.trim(),
				tipo,
				resposta: valor,
				horario: item?.horario ? new Date(item.horario).toLocaleString('pt-BR') : '',
			});
		}

		if (!projetoResumo.has(projeto)) {
			projetoResumo.set(projeto, { total: 0, erros: 0 });
		}

		if (definidos > 0) {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			const resumo = projetoResumo.get(projeto)!;
			resumo.total += 1;
			if (erros > 0) resumo.erros += 1;
		}
	}

	let totalProjetos = 0;
	let totalOk = 0;
	let totalComErro = 0;

	for (const { total, erros } of projetoResumo.values()) {
		totalProjetos += total;
		if (erros > 0) {
			totalComErro++;
		} else {
			totalOk++;
		}
	}

	res.json({
		projetos: lista,
		resumo: {
			totalProjetos,
			totalOk,
			totalComErro,
		},
	});
});

export default router;
