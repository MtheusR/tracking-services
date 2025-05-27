import express, { type Request, type Response } from 'express';
import ping from 'ping';

const router = express.Router();

router.get('/ping', async (req: Request, res: Response) => {
	const { ip } = req.query;

	if (!ip || typeof ip !== 'string') {
		return res.status(400).json({ error: 'IP inválido' });
	}

	try {
		const result = await ping.promise.probe(ip);

		return res.json({
			host: result.host,
			online: result.alive,
			timeMs: result.time,
		});
	} catch (error) {
		return res.status(500).json({
			error: 'Falha ao executar ping',
		});
	}
});

export default router;
