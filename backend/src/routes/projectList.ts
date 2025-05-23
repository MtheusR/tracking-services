import express, { type Request, type Response } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';

const router = express.Router();

router.get('/projetos', async (_req: Request, res: Response) => {
	try {
		const filePath = path.join(__dirname, '../data/projects.json');
		const data = await fs.readFile(filePath, 'utf-8');
		const projetos = JSON.parse(data);
		res.json(projetos);
	} catch (error) {
		console.error('Erro ao ler o JSON:', error);
		res.status(500).json({ error: 'Erro ao ler os projetos' });
	}
});

export default router;
