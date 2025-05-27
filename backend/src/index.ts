import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import httpMonitor from './routes/httpMonitor';
import pingMonitor from './routes/pingMonitor';
import sslMonitor from './routes/sslMonitor';
import systemMonitor from './routes/systemMonitor';
import projectList from './routes/projectList';
import statusMonitor from './routes/statusMonitor';

import { startStatusMonitor } from './routes/tracking/monitorRunner';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Monitor Backend is running!');
});

app.use('/monitor', httpMonitor);
app.use('/monitor', pingMonitor);
app.use('/monitor', sslMonitor);
app.use('/monitor', systemMonitor);
app.use('/monitor', projectList);
app.use('/monitor', statusMonitor);

startStatusMonitor();

app.listen(PORT, () => {
	console.log(`✅ Server running on http://localhost:${PORT}`);
});
