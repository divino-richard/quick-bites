import express, { Request, Response } from 'express';
import foodMenuItemUpload from '../utils/fileUpload/foodMenuItem.utils';
import { addFoodMenu, getFoodMenusByUserId } from '../controller/foodMenu.controller';

const foodMenuRouter = express.Router();

foodMenuRouter.post('/', (req: Request, res: Response) => {
    foodMenuItemUpload(req, res, (error) => {
        if(error) {
            res.status(400).json({message: error.message});
            return;
        }

        if(!req.file) {
            res.status(400).json({message: 'Food menu image is require'});
            return;
        }

        addFoodMenu(req, res);
    })
});

foodMenuRouter.get('/list', (req: Request, res: Response) => {
    getFoodMenusByUserId(req, res);
});

export default foodMenuRouter;
