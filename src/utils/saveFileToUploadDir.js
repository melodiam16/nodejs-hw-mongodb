import path from 'node:path';
import fs from 'node:fs/promises';
import { UPLOAD_DIR } from '../constants/index.js';
// import { env } from './env.js';

export const saveFileToUploadDir = async (file) => {
  const newPath = path.join(UPLOAD_DIR, file.filename);
  await fs.rename(file.path, newPath);

  //   return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
};
