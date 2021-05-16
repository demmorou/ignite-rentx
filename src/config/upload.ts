import multer from 'multer';
import { resolve } from 'path';
import { v4 as uuidV4 } from 'uuid';

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const file_name = `${uuidV4()}-${file.originalname}`;

          return callback(null, file_name);
        },
      }),
    };
  },
};
