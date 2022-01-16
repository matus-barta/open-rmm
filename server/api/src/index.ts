import express from 'express';
import dotenv from 'dotenv';
import { Router } from 'express';
import log from './logger';
import dbConnect from './db/connect';

import avRouter from '../routes/av.route';
import volumesRouter from '../routes/volumes.route';
import systemInfoRouter from '../routes/systemInfo.route';

// initialize configuration
dotenv.config();

const app = express();
const routes = Router();

const port = Number(process.env.PORT ?? 5005);
const host = process.env.HOST ?? 'localhost';

app.use(routes);
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true //is it needed?
	})
);

// define a route handler for the default home page
app.get('/', (req, res) => res.send('❤️ Hello World! ❤️'));

//define routes
routes.use('/api/av', avRouter);
routes.use('/api/volumes', volumesRouter);
routes.use('/api/systemInfo', systemInfoRouter);

app.listen(port, host, () => {
	log.info(`⚡️ : Server is running at http://${host}:${port}`);
	dbConnect(); //connect to the db
});
app.on('error', (error) => {
	log.error('❌ : Server error:', error);
});
