import express, { Request, Response } from 'express';
import { validateSchema } from '../schema';
import { createMenu, deleteMenu, getMenuById, getRestaurantMenus, updateMenuById, updateMenuStatus } from '../services/menus.service';
import { createMenuSchema, deleteMenuSchema, getMenuSchema, getRestaurantMenusSchema, updateMenuSchema, updateMenuStatusSchema } from '../schema/menu.schema';

const menuRouter = express.Router();

menuRouter.post('/', validateSchema(createMenuSchema), async(req: Request, res: Response) => {
  try {
    const menu = await createMenu(req.body);
    if(!menu) return res.status(400).json({
      message: 'Failed to create menu'
    });
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json(error)
  }
});

menuRouter.get('/', validateSchema(getRestaurantMenusSchema), async(req: Request, res: Response) => {
  try {
    const { rid } = req.query;
    const menus = await getRestaurantMenus({ restaurant: String(rid) });
    if(!menus) return res.status(400).json({
      message: 'Failed to get restaurant menus'
    });
    res.status(200).json(menus)
  } catch (error) {
    res.status(500).json(error);
  }
})

menuRouter.get('/:id', validateSchema(getMenuSchema), async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const menu = await getMenuById({id});
    if(!menu) return res.status(400).json({
      message: 'Failed to get menu',
    });
    res.status(200).json(menu);
  } catch(error) {
    res.status(500).json(error);
  }
})

menuRouter.put('/:id', validateSchema(updateMenuSchema), async(req: Request, res: Response) => {
  try {
    const menuId = req.params.id;
    const menu = await updateMenuById({menuId, ...req.body});
    if(!menu) return res.status(400).json({
      message: 'Failed to update menu'
    });
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json(error);
  }
});

menuRouter.put('/status/:id', validateSchema(updateMenuStatusSchema), async(req: Request, res: Response) => {
  try {
    const menuId = req.params.id;
    const { status } = req.body; 
    const menu = await updateMenuStatus({menuId, status});
    if(!menu) return res.status(400).json({
      message: 'Failed to update menu status',
    });
    res.status(200).json(menu);
  } catch(error) {
    res.status(500).json(error);
  }
});

menuRouter.delete('/:id', validateSchema(deleteMenuSchema), async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const menu = await deleteMenu({ id });
    if(!menu) return res.status(400).json({
      message: 'Failed to delete menu'
    });
    res.status(200).json({
      message: 'Menu deleted successfully'
    });
  } catch(error) {
    res.status(500).json(error);
  }
});

export default menuRouter;
