import express, { type Request, type Response } from 'express';
import sslChecker from 'ssl-checker';

const router = express.Router();

router.get('/ssl', async (req: Request, res: Response) => {
	const { domain } = req.query;

	if (!domain || typeof domain !== 'string') {
		return res
			.status(400)
			.json({ error: 'Parâmetro "domain" é obrigatório e deve ser uma string.' });
	}

	try {
		const sslInfo = await sslChecker(domain.replace(/^https?:\/\//, ''), {
			method: 'GET',
			port: 443,
		});

		return res.json({
			valid: sslInfo.valid,
			daysRemaining: sslInfo.daysRemaining,
			validFrom: sslInfo.validFrom,
			validTo: sslInfo.validTo,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Falha ao verificar o certificado SSL.' });
	}
});

export default router;
