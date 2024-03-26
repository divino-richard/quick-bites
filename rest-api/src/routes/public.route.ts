import express, { Request, Response } from 'express';
import { getFoodMenus, searchFoods } from '../controller/foodMenu.controller';

const publicRouter = express.Router();

publicRouter.get('/foodMenu/list/:skip/:limit', (req: Request, res: Response) => {
    getFoodMenus(req, res);
});

publicRouter.get('/food/search/:key', (req: Request, res: Response) => {
    searchFoods(req, res);
});

export default publicRouter;
