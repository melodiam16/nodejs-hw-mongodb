import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

initMongoConnection();
createDirIfNotExists(TEMP_UPLOAD_DIR);
createDirIfNotExists(UPLOAD_DIR);
setupServer();

// const boostrap = async () => {
//   await initMongoDB();
//   startServer();
// };

// boostrap();
