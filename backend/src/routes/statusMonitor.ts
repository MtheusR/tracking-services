// src monitor
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

	// Mapa com o resumo por projeto
	const projetoErros = new Map<string, boolean>(); // true = tem erro

	for (const [key, statusObj] of statusMap.entries()) {
		const [projeto, dominio] = key.split('-');

		let temErro = false;

		for (const tipo of Object.keys(statusObj) as StatusTipo[]) {
			const item = statusObj[tipo];
			const valor = item?.valor;

			if (valor === false) {
				temErro = true;
			}

			lista.push({
				projeto: projeto.trim(),
				dominio: dominio.trim(),
				tipo,
				resposta: valor,
				horario: item?.horario ? new Date(item.horario).toLocaleString('pt-BR') : '',
			});
		}

		// Marca que o projeto teve erro se já tiver ou se este subprojeto tem erro
		const jaTemErro = projetoErros.get(projeto.trim()) ?? false;
		projetoErros.set(projeto.trim(), jaTemErro || temErro);
	}

	let totalProjetos = 0;
	let totalComErro = 0;
	let totalOk = 0;

	for (const [, temErro] of projetoErros) {
		totalProjetos++;
		if (temErro) {
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
