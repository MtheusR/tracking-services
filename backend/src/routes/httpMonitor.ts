// biome-ignore lint/style/useImportType: <explanation>
import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/http', async (req: Request, res: Response) => {
	const { url } = req.query;

	if (!url || typeof url !== 'string') {
		return res.status(400).json({ error: 'URL inválida' });
	}

	try {
		const start = Date.now();
		const response = await axios.get(url);
		const duration = Date.now() - start;

		return res.json({
			status: 'online',
			httpStatus: response.status,
			timeMs: duration,
		});
	} catch (error) {
		return res.json({
			status: 'offline',
			message: 'Site não respondeu ou está fora do ar.',
		});
	}
});

export default router;
