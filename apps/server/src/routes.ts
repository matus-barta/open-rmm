import { Express, Request, Response } from 'express';
import checkAuthUUID from './middleware/checkAuthUUID';
import validateResource from './middleware/validateResource';

import { computerSchema } from './schema/computer.schema';
import { addComputer } from './routes/computer';
import { systemInfoSchema } from './schema/systemInfo.schema';
import { updateSystemInfo } from './routes/systemInfo';

export default function (app: Express) {
	// define a route handler for the default home page
	app.get('/', (req: Request, res: Response) => res.send('❤️ Hello World! ❤️'));
	app.get('/healthcheck', (req: Request, res: Response) => res.send({ status: 'OK' }));

	//add computer during client installation
	app.post('/computer', validateResource(computerSchema), addComputer);

	//add new record to systemInfo
	app.post('/systemInfo', checkAuthUUID, validateResource(systemInfoSchema), updateSystemInfo);

	//add new record to antivirus
	/*app.post(
		'/api/antivirus',
		checkAuthUUID,
		validateResource(createAntivirusSchema),
		createAntivirusHandler
	);*/

	//add new record to volume
	//app.post('/api/volume', checkAuthUUID, validateResource(createVolumeSchema), createVolumeHandler);

	//Updates reporting
	//app.post('/api/update', checkAuthUUID, validateResource(createUpdateSchema), createUpdateHandler);
}
