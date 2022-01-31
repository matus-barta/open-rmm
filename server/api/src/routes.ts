import { Express, Request, Response } from 'express';
import checkAuthUUID from './middleware/checkAuthUUID';
import validateResource from './middleware/validateResource';

import { createComputerHandler, updateComputerHandler } from './controller/computer.controller';
import { createSystemInfoHandler } from './controller/systemInfo.controller';
import { createComputerSchema, updateComputerSchema } from './schema/computer.schema';
import { createSystemInfoSchema } from './schema/systemInfo.schema';

export default function (app: Express) {
	// define a route handler for the default home page
	app.get('/', (req: Request, res: Response) => res.send('❤️ Hello World! ❤️'));
	app.get('/api/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

	//creating computer from dashboard
	//TODO: check if you can add computer
	app.post('/api/computer/', validateResource(createComputerSchema), createComputerHandler);

	//add computer during client installation
	//well should pass uuid in url but...
	//TODO: fix for correct PUT method passing OneTimeKey in URL (maybe)
	app.put('/api/computer/', validateResource(updateComputerSchema), updateComputerHandler);

	//add new record to systemInfo
	app.post(
		'/api/systemInfo',
		checkAuthUUID,
		validateResource(createSystemInfoSchema),
		createSystemInfoHandler
	);
}
