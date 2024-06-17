import express, { Request, Response } from 'express';
import { MulterError } from 'multer';
import { uploadImage, uploadImages } from '../utils/upload/image.utils';
import { validateSchema } from '../schema';
import { deleteImageSchema } from '../schema/upload.schema';
import fs from 'fs';
import { ROOT_DIRECTORY } from '../../_dirname';

const uploadRouter = express.Router();

uploadRouter.post('/images', async(req: Request, res: Response) => {
  try {
    const BASE_URL = process.env.BASE_URL;
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

uploadRouter.post('/image', async(req: Request, res: Response) => {
  try {
    const BASE_URL = process.env.BASE_URL;
    if(!BASE_URL) {
      throw new Error('Base url env error');
    }
    uploadImage(req, res, (error) => {
      if(error instanceof MulterError) {
        return res.status(400).json({
          message: error.message,
        });
      } else if(error) {
        return res.status(400).json({
          message: (error as Error).message,
        });
      }
      if(!req.file) {
        return res.status(400).json({
          message: 'No file exist'
        });
      }
      const data = {
        imageUrl: `${BASE_URL}/uploads/${req.file?.filename}`,
        fileName: req.file.filename
      }
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

uploadRouter.delete('/image', validateSchema(deleteImageSchema), async(req: Request, res: Response) => {
  try { 
    const { filename } = req.query;
    const path = ROOT_DIRECTORY + '/src/uploads/' + filename;
    fs.unlink(path, (error) => {
      if(error) return res.status(400).json({
        message: 'Failed to delete image'
      });
      res.status(200).json({
        message: 'File deleted successfully'
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default uploadRouter;
