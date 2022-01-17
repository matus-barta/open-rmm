import { Express, Request, Response } from 'express';
import { createSystemInfoHandler } from './controller/systemInfo.controller';
import validateResource from './middleware/validateResource';
import { createSystemInfoSchema } from './schema/systemInfo.schema';

export default function (app: Express) {
	// define a route handler for the default home page
	app.get('/', (req: Request, res: Response) => res.send('❤️ Hello World! ❤️'));

	app.post('/api/systemInfo', validateResource(createSystemInfoSchema), createSystemInfoHandler);
}
