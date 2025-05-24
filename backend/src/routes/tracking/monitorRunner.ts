// src/monitor/monitorRunner.ts
import cron from 'node-cron';
import { checkPing, checkHttp, checkSsl } from './statusChecker';
import fs from 'node:fs/promises';
import path from 'node:path';

export const statusMap = new Map<string, any>();

let projetos: any[] = [];

export async function startStatusMonitor() {
	const filePath = path.join(__dirname, '../../data/projects.json');
	const file = await fs.readFile(filePath, 'utf-8');
	projetos = JSON.parse(file);

	console.log('✅ Projetos carregados:', projetos.length);

	// ✅ Verifica SSL imediatamente
	await verificarTipo('ssl');
	await verificarTipo('http');
	await verificarTipo('ping');

	// 🔁 PING: a cada 30 segundos
	cron.schedule('*/30 * * * * *', async () => {
		await verificarTipo('ping');
	});

	// 🌐 HTTP: a cada 1 minuto
	// cron.schedule('* * * * *', async () => {
	cron.schedule('*/30 * * * * *', async () => {
		await verificarTipo('http');
	});

	// 🔒 SSL: 1 vez por dia (meia-noite)
	// cron.schedule('0 0 * * *', async () => {
	cron.schedule('*/30 * * * * *', async () => {
		await verificarTipo('ssl');
	});
}

async function verificarTipo(tipo: 'ping' | 'http' | 'ssl') {
	for (const projeto of projetos) {
		for (const sub of projeto.subprojetos) {
			const key = `${projeto.nome_do_projeto}-${sub.dominio}`;
			const statusAnterior = statusMap.get(key) || {};

			let resultado: boolean | undefined;

			if (tipo === 'ping') resultado = await checkPing(sub.ip);
			if (tipo === 'http') resultado = await checkHttp(sub.dominio);
			if (tipo === 'ssl') resultado = await checkSsl(sub.dominio);

			statusMap.set(key, {
				...statusAnterior,
				[tipo]: {
					valor: resultado,
					horario: new Date().toISOString(),
				},
			});

			console.log(
				`[${tipo.toUpperCase()}] ${projeto.nome_do_projeto} (${sub.dominio}) => ${resultado ? '✅ OK' : '❌ FAIL'}`,
			);
		}
	}
}
