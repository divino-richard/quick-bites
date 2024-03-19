import express, { Request, Response } from 'express';
import foodMenuItemUpload from '../utils/fileUpload/foodMenuItem.utils';
import { addFoodMenu } from '../controller/foodMenu.controller';

const foodMenuRouter = express.Router();

foodMenuRouter.post('/', (req: Request, res: Response) => {
    foodMenuItemUpload(req, res, (error) => {
        if(error) {
            res.status(400).json({message: error.message});
            return;
        }

        addFoodMenu(req, res);
    })
});

export default foodMenuRouter;
