import { Router } from 'express';
import express from 'express';
import fs from 'fs';

import IsystemInfo from '../interfaces/IsystemInfo';
import SystemInfo from '../models/systemInfo.model';



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
        systemInfo.LastBootUpTime = systemInfo.LastBootUpTime.substring(6, systemInfo.LastBootUpTime.length - 2);

        const systemInfo_db = new SystemInfo({
            UUID: deviceUUID,
            Time: timeNow,
            PendingReboot: systemInfo.PendingReboot.toLowerCase(),
            ComputerName: systemInfo.ComputerName,
            LastBootUpTime: new Date(parseInt(systemInfo.LastBootUpTime)),
            OsVersion: systemInfo.WindowsVersion,
            OsName: systemInfo.WindowsProductName,
            KernelVersion: systemInfo.OsHardwareAbstractionLayer
        });

        systemInfo_db.save((err: any) => {
            if (err) {
                console.log(err);
                status = 500;
            } else {
                status = 200;
            }
        });
    } catch (error) {
        status = 500;
        console.log(error);
    }
    return res.sendStatus(status);
});

export default systemInfoRouter;