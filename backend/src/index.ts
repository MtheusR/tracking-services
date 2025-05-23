import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import httpMonitor from './routes/httpMonitor';
import pingMonitor from './routes/pingMonitor';
import sslMonitor from './routes/sslMonitor';
import systemMonitor from './routes/systemMonitor';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
	res.send('Monitor Backend is running!');
});

// 🧠 Rota de monitoramento HTTP
app.use('/monitor', httpMonitor);

// Rota de PING
app.use('/monitor', pingMonitor);

// 🔒 sslMonitor
app.use('/monitor', sslMonitor);

// Dados de uso
app.use('/monitor', systemMonitor);

app.listen(PORT, () => {
	console.log(`✅ Server running on http://localhost:${PORT}`);
});
