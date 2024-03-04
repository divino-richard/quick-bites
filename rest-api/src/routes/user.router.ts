import express, {Request, Response} from 'express'
import { userValidId } from '../utils/fileUpload.utils';
import multer from 'multer';
import { addUserValidId } from '../controller/user.controller';

const userRouter = express.Router();

userRouter.post('/valid-id', (req: Request, res: Response) => {
    userValidId(req, res, function (error) {
        if(error instanceof multer.MulterError) {
            return res.status(402).json({message: error.message});
        } else if(error instanceof Error) {
            return res.status(402).json({message: error.message});
        }
        
        if(!req.files) {
            return res.status(402).json({message: 'No file exist'});
        }

        addUserValidId(req, res);
    });
});

export default userRouter;
