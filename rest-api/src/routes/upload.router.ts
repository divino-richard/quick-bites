import express, { Request, Response } from 'express';
import uploadImages from '../utils/upload/images.utils';
import { MulterError } from 'multer';

const uploadRouter = express.Router();

uploadRouter.post('/images', async(req: Request, res: Response) => {
  const BASE_URL = process.env.BASE_URL;
  try {
    if(!BASE_URL) {
      throw new Error('Base url env error');
    }
    uploadImages(req, res, (error) => {
      if (error instanceof MulterError) {
        return res.status(400).json({
          message: error.message
        });
      } else if (error) {
        return res.status(400).json({
          message: (error as Error).message
        });
      }
      const files = Array.from(req.files as Express.Multer.File[]);
      const data: any = [];
      files.map((file) => {
        data.push({
          imageUrl: `${BASE_URL}/uploads/${file.filename}`,
          fileName: file.filename
        });
      });
      res.status(200).json(data);
    });
  } catch(error) {
    res.status(500).json(error);
  }
});

export default uploadRouter;
