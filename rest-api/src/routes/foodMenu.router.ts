import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { foodMenuImageUpload } from '../utils/fileUpload.utils';
import multer, { FileFilterCallback } from 'multer';
import { validateFoodMenuItem } from '../validator';
import { ZodError } from 'zod';
import { ROOT_DIRECTORY } from '../../_dirname';

const foodMenuRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${ROOT_DIRECTORY}/src/uploads/`);
    },

    filename: function (req, file, cb) {
        const fileName = file.originalname.split('.')[0];
        const fileExtension = file.originalname.split('.')[1];

        cb(null, `${fileName}-${Date.now()}.${fileExtension}`);
    }
});

async function foodMenuFileFilter (req: Request, file: Express.Multer.File, callback: FileFilterCallback){
    try {
        validateFoodMenuItem.parse(req.body);
        callback(null, true);
    } catch(error) {
        if(error instanceof ZodError) {
            const errorMessages = error.errors.map((issue: any) => ({
                message: `${issue.path.join('.')} is ${issue.message}`,
            }))
            callback(new Error(errorMessages[0].message));
        } else {
            callback(new Error('Internal server error'));
        }
    }
}

const limits = {
    fileSize: 1 * 1000 * 1000,  // 1 MB
    files: 1,
};

const upload = multer({storage, limits, fileFilter: foodMenuFileFilter}).single('foodMenuImage');

foodMenuRouter.post('/', (req: Request, res: Response) => {
    upload(req, res, (error) => {
        if(error) {
            res.status(402).json({message: error.message});
            return;
        }

        console.log("Request File", req.file);
        console.log("Request fields", req.body);
       
        res.status(200).json({message: "Uploaded succesfully"});
    })
});

export default foodMenuRouter;
