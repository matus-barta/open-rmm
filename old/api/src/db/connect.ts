import mongoose from 'mongoose';
import log from '../utils/logger';

function connect() {
	const dbUri = process.env.MONGO_DB as string;

	return mongoose
		.connect(dbUri)
		.then(() => {
			log.info('🍃 : MongoDB database connection established successfully');
		})
		.catch((error) => {
			log.error('❌ : Connection error:', error);
			process.exit(1);
		});
}

export default connect;
