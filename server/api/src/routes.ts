import { Express, Request, Response } from 'express';
import checkAuthUUID from './middleware/checkAuthUUID';
import validateResource from './middleware/validateResource';

import {
	createComputerHandler,
	updateComputerHandler,
	listComputersHandler
} from './controller/computer.controller';
import { createComputerSchema, updateComputerSchema } from './schema/computer.schema';

import { createSystemInfoHandler } from './controller/systemInfo.controller';
import { createSystemInfoSchema } from './schema/systemInfo.schema';

import { createAntivirusSchema } from './schema/antivirus.schema';
import { createAntivirusHandler } from './controller/antivirus.controller';

import { createVolumeSchema } from './schema/volume.schema';
import { createVolumeHandler } from './controller/volume.controller';

import { createUpdateSchema } from './schema/update.schema';
import { createUpdateHandler } from './controller/update.controller';

export default function (app: Express) {
	// define a route handler for the default home page
	app.get('/', (req: Request, res: Response) => res.send('❤️ Hello World! ❤️'));
	app.get('/api/healthcheck', (req: Request, res: Response) => res.send('{"status": "OK"}'));

	//creating computer from dashboard
	//TODO: check for permissions to can add computer
	app.post('/api/computer/', validateResource(createComputerSchema), createComputerHandler);

	//add computer during client installation
	app.put('/api/computer/', validateResource(updateComputerSchema), updateComputerHandler);
	app.get('/api/computer', listComputersHandler);

	//add new record to systemInfo
	app.post(
		'/api/systemInfo',
		checkAuthUUID,
		validateResource(createSystemInfoSchema),
		createSystemInfoHandler
	);

	//add new record to antivirus
	app.post(
		'/api/antivirus',
		checkAuthUUID,
		validateResource(createAntivirusSchema),
		createAntivirusHandler
	);

	//add new record to volume
	app.post('/api/volume', checkAuthUUID, validateResource(createVolumeSchema), createVolumeHandler);

	//Updates reporting
	app.post('/api/update', checkAuthUUID, validateResource(createUpdateSchema), createUpdateHandler);
}
