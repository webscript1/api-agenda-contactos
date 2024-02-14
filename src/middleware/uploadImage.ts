import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path  from 'path'




const storage = multer.diskStorage({
  destination: path.join(__dirname, '..','..', 'uploads'),
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  upload.single('image')(req, res, next);
};
