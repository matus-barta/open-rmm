import express from 'express';
import dotenv from 'dotenv';
import log from './utils/logger';
import dbConnect from './db/connect';
import routes from './routes';

// initialize configuration
dotenv.config();

const app = express();

const port = Number(process.env.PORT ?? 5005);
const host = process.env.HOST ?? 'localhost';

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true //is it needed?
	})
);

//define routes
//routes.use('/api/av', avRouter);
//routes.use('/api/volumes', volumesRouter);
//routes.use('/api/systemInfo', systemInfoRouter);

app.listen(port, host, () => {
	log.info(`⚡️ : Server is running at http://${host}:${port}`);
	dbConnect(); //connect to the db
	routes(app);
});
app.on('error', (error) => {
	log.error('❌ : Server error:', error);
});
