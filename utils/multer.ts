

import multer from 'multer';

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const multerPromise = (req: any, res: any): Promise<void> =>
  new Promise((resolve, reject) => {
    upload.single('file')(req, res, (err: any) => {
      if (err) return reject(err);
      resolve(req);
    });
  });