import { Router } from 'express';
import express from 'express';
import fs from 'fs';
import Volumes from '../models/volumes.model';
import IvolumeName from '../interfaces/IvolumeName';



const volumesNamesRouter = Router();

volumesNamesRouter.get('/', (req, res) => {
    return res.json('HI!');
});

volumesNamesRouter.post('/', express.json(), (req, res) => {
    let status = 200;
    const deviceUUID = req.header('Device-UUID') as string;
    if (deviceUUID == "" || deviceUUID == undefined) {
        status = 403;
        return res.sendStatus(status);
    }

    console.log('➡️  : Received volumesNames from ' + deviceUUID);

    try {
        const jsonBody = req.body;
        if (process.env.SAVE_JSON_AS_FILE) {
            fs.writeFileSync(process.env.SAVE_JSON_PATH + 'volumeNames.json', JSON.stringify(jsonBody));
        }

        const I_VolumeNames = jsonBody as IvolumeName[];

        I_VolumeNames.forEach(volumeName => {
            const query = { 'UUID': deviceUUID, 'DriveLetter': volumeName.DeviceID.charAt(0) };
            Volumes.updateMany(query, { DriveName: volumeName.VolumeName }, (error: any, res: any) => {
                console.log(`ERROR : ${error}`);
                console.log(`Response : ${JSON.stringify(res)}`);
            });
        });


    } catch (error) {
        console.log(error);
        status = 500;
    }
    return res.sendStatus(status);
});

export default volumesNamesRouter;