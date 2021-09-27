import { Router } from 'express';
import express from 'express';
import Iav from '../interfaces/Iav';
import fs from 'fs';
import AV from '../models/av.model';

const avRouter = Router();

avRouter.get('/', (req, res) => {
	return res.json('HI!');
});

avRouter.post('/', express.json(), (req, res) => {
	let status = 200;
	const deviceUUID = req.header('Device-UUID') as string;
	if (deviceUUID == '' || deviceUUID == undefined) {
		status = 403;
		return res.sendStatus(status);
	}

	console.log('➡️  : Received AV from ' + deviceUUID);

	try {
		const jsonBody = req.body;

		if (process.env.SAVE_JSON_AS_FILE) {
			fs.writeFileSync(process.env.SAVE_JSON_PATH + 'av.json', JSON.stringify(jsonBody));
		}
		const I_AV = jsonBody as Iav;
		I_AV.Time = Date.now();
		I_AV.UUID = deviceUUID;

		const AV_db = new AV(I_AV);
		AV_db.save((err: any) => {
			if (err) {
				console.log(err);
				status = 500;
			} else {
				status = 200;
			}
		});
	} catch (error) {
		status = 500;
	}
	return res.sendStatus(status);
});

export default avRouter;
