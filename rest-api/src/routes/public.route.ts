import express, { Request, Response } from 'express';
import { getFoodMenus } from '../controller/foodMenu.controller';

const publicRouter = express.Router();

publicRouter.get('/foodMenu/list/:skip/:limit', (req: Request, res: Response) => {
    getFoodMenus(req, res);
})

export default publicRouter;
