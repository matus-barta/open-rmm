import { Express, Request, Response } from 'express';
import checkAuthUUID from './middleware/checkAuthUUID';
import validateResource from './middleware/validateResource';

import { createComputerHandler, updateComputerHandler } from './controller/computer.controller';
import { createComputerSchema, updateComputerSchema } from './schema/computer.schema';

import { createSystemInfoHandler } from './controller/systemInfo.controller';
import { createSystemInfoSchema } from './schema/systemInfo.schema';

import { createAntivirusSchema } from './schema/antivirus.schema';
import { createAntivirusHandler } from './controller/antivirus.controller';

import { createVolumeSchema } from './schema/volume.schema';
import { createVolumeHandler } from './controller/volume.controller';

export default function (app: Express) {
	// define a route handler for the default home page
	app.get('/', (req: Request, res: Response) => res.send('❤️ Hello World! ❤️'));
	app.get('/api/healthcheck', (req: Request, res: Response) => res.send('{"status": "OK"}'));

	//creating computer from dashboard
	//TODO: check for permissions to can add computer
	app.post('/api/computer/', validateResource(createComputerSchema), createComputerHandler);

	//add computer during client installation
	//well we should pass uuid in url but...
	//TODO: fix for correct PUT method passing OneTimeKey in URL (maybe)
	app.put('/api/computer/', validateResource(updateComputerSchema), updateComputerHandler);

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

	//TODO: Implement Win Update reporting
}
