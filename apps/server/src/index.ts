import express from 'express';
import dotenv from 'dotenv';
import log from './utils/logger';
import routes from './routes';

// initialize configuration
dotenv.config();

const app = express();

const port = Number(process.env.PORT ?? 5005);
const host = process.env.HOST ?? '0.0.0.0';

app.use(express.json());

app.listen(port, host, () => {
	log.info(`⚡️ : Server is running at http://${host}:${port}`);
	routes(app);
});
app.on('error', (error) => {
	log.error('❌ : Server error:', error);
});
