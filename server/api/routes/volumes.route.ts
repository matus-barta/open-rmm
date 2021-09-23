import { Router } from 'express';
import express from 'express';
import Ivolume from '../interfaces/Ivolume';
import Idrive from '../interfaces/Idrive';
import fs from 'fs';
import Volumes from '../models/volumes.model';

const volumesRouter = Router();

volumesRouter.get('/', (req, res) => {
    return res.json('HI!');
});

volumesRouter.post('/', express.json(), (req, res) => {
    let status = 200;
    const deviceUUID = req.header('Device-UUID') as string;
    if (deviceUUID == "" || deviceUUID == undefined) {
        status = 403;
        return res.sendStatus(status);
    }

    console.log('➡️  : Received volumes from ' + deviceUUID);

    try {
        const jsonBody = req.body;
        if (process.env.SAVE_JSON_AS_FILE) {
            fs.writeFileSync(process.env.SAVE_JSON_PATH + 'drives.json', JSON.stringify(jsonBody));
        }
        const timeNow = Date.now();
        const I_Drives = jsonBody as Idrive[];

        I_Drives.forEach(drive => {
            if (drive.DriveLetter != null) {
                const I_Volume = drive as Ivolume;
                I_Volume.Time = timeNow;
                I_Volume.UUID = deviceUUID;

                const volumes_db = new Volumes(I_Volume);
                volumes_db.save((err: any) => {
                    if (err) {
                        console.log(err);
                        status = 500;
                    } else {
                        status = 200;
                    }
                });
            }
        });

    } catch (error) {
        status = 500;
    }
    return res.sendStatus(status);
});

export default volumesRouter;