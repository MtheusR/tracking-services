import express, { type Request, type Response } from 'express';
import si from 'systeminformation';

const router = express.Router();

router.get('/system', async (_req: Request, res: Response) => {
	try {
		const cpu = await si.currentLoad();
		const mem = await si.mem();
		const disk = await si.fsSize();

		return res.json({
			cpuLoad: cpu.currentLoad.toFixed(2), // %
			ramUsed: (mem.used / 1024 / 1024 / 1024).toFixed(2), // GB
			ramTotal: (mem.total / 1024 / 1024 / 1024).toFixed(2), // GB
			ramUsagePercent: ((mem.used / mem.total) * 100).toFixed(2),
			diskUsed: (disk[0].used / 1024 / 1024 / 1024).toFixed(2), // GB
			diskTotal: (disk[0].size / 1024 / 1024 / 1024).toFixed(2), // GB
			diskUsagePercent: disk[0].use.toFixed(2),
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao coletar informações do sistema' });
	}
});

export default router;
