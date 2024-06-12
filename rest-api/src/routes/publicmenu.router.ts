import express, { Request, Response } from 'express';
import { validateSchema } from '../schema';
import { getPublicMenusSchema, searchPublicMenuSchema } from '../schema/publicmenu.schema';
import { getMenus, searchMenu } from '../services/menus.service';

const publicMenuRouter = express.Router();

publicMenuRouter.get('/', validateSchema(getPublicMenusSchema), async(req: Request, res: Response) => {
  try {
    const {skip, limit} = req.query;
    const menus = await getMenus({
      skip: Number(skip),
      limit: Number(limit),
    })
    if(!menus) return res.status(400).json({
      message: 'Failed to get menus'
    });
    res.status(200).json(menus);
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

publicMenuRouter.get('/search', validateSchema(searchPublicMenuSchema), async(req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    const menus = await searchMenu({keyword: String(keyword)});
    if(!menus) return res.status(400).json({
      message: 'Failed to search menus'
    });
    res.status(200).json(menus);
  } catch(error) {
    res.status(500).json(error);
  }
})

publicMenuRouter.get('/food/search/:key', (req: Request, res: Response) => {
});

export default publicMenuRouter;
