// src/routes/monitor.routes.ts
import { Router } from 'express';
import { statusMap } from './tracking/monitorRunner';

const router = Router();

router.get('/status', (_req, res) => {
	res.json(Object.fromEntries(statusMap));
});

export default router;
