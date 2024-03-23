import express, { Request, Response } from 'express';
import foodMenuItemUpload from '../utils/fileUpload/foodMenuItem.utils';
import { addFoodMenu, deleteFoodMenu, getFoodMenusByUserId, updateFoodMenu } from '../controller/foodMenu.controller';
import { validateSchema } from '../validator';
import { updateFoodMenuItemSchema } from '../validator/schemas/foodMenu.schema';

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

foodMenuRouter.delete('/:id', (req: Request, res: Response) => {
    deleteFoodMenu(req, res);
});

foodMenuRouter.put('/:id', validateSchema(updateFoodMenuItemSchema), (req: Request, res: Response) => {
    updateFoodMenu(req, res);
});

export default foodMenuRouter;
