import { Router } from 'express';
import bodyParser from 'body-parser';

const avRouter = Router();

avRouter.get('/', (req, res) => {
    return res.json('OK');
});

avRouter.post('/', bodyParser.json(), (req, res) => {
    console.log('➡️ : Received AV');

    let status = 200;
    try {
        const jsonBody = req.body;
    } catch (error) {
        status = 500;
    }
    return res.sendStatus(status);
});

export default avRouter;