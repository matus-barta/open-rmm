import { Router } from 'express';
import express from 'express';
import fs from 'fs';

import IsystemInfo from '../interfaces/IsystemInfo';



const systemInfoRouter = Router();

systemInfoRouter.get('/', (req, res) => {
    return res.json('HI!');
});

systemInfoRouter.post('/', express.json(), (req, res) => {
    let status = 200;
    const deviceUUID = req.header('Device-UUID') as string;
    if (deviceUUID == "" || deviceUUID == undefined) {
        status = 403;
        return res.sendStatus(status);
    }

    console.log('➡️  : Received systemInfo from ' + deviceUUID);

    try {
        const jsonBody = req.body;
        if (process.env.SAVE_JSON_AS_FILE) {
            fs.writeFileSync(process.env.SAVE_JSON_PATH + 'systemInfo.json', JSON.stringify(jsonBody));
        }
        const timeNow = Date.now();
        const systemInfo = jsonBody as IsystemInfo;

        console.log(JSON.stringify(systemInfo));


    } catch (error) {
        status = 500;
        console.log(error);
    }
    return res.sendStatus(status);
});

export default systemInfoRouter;