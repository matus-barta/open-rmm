import express from 'express';
import dotenv from 'dotenv';
import { Router } from 'express';
import mongoose from 'mongoose';

import avRouter from '../routes/av.route';
import volumesRouter from '../routes/volumes.route';
import systemInfoRouter from '../routes/systemInfo.route';

// initialize configuration
dotenv.config();

const app = express();
const routes = Router();
const PORT = process.env.PORT;

app.use(routes);
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//db connection
const db_uri = process.env.MONGO_DB as string;
mongoose.connect(db_uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, '❌ : Connection error:'));
db.once('open', () => {
    console.log('🍃 : MongoDB database connection established successfully');
});

// define a route handler for the default home page
app.get('/', (req, res) => res.send("❤️ Hello World! ❤️"));

//define routes
routes.use('/api/av', avRouter);
routes.use('/api/volumes', volumesRouter);
routes.use('/api/systemInfo', systemInfoRouter);

app.listen(PORT, () => {
    console.log(`⚡️ : Server is running at http://localhost:${PORT}`);
});
app.on('error', console.error.bind(console, '❌ : Server error:'));
