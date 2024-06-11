import express, { Request, Response } from 'express';
import { validateSchema } from '../schema';
import { createMenu, deleteMenu, getMenuById, getMenusByBusinessId, updateMenuById } from '../services/menus.service';
import { createMenuSchema, deleteMenuSchema, getBusinessMenusSchema, getMenuSchema, updateMenuSchema, updateMenuStatusSchema } from '../schema/menu.schema';
import { createMenuImages, deleteMenuImages, updateMenuStatus } from '../services/menuimages.service';

const menuRouter = express.Router();

menuRouter.delete('/:id', validateSchema(deleteMenuSchema), async(req: Request, res: Response) => {
  try {
    const menuId = req.params.id;
    const menuImages = await deleteMenuImages(menuId);
    if(!menuImages) return res.status(400).json({
      message: 'Failed to delete menu images',
    });
    const menu = await deleteMenu(menuId);
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

menuRouter.post('/', validateSchema(createMenuSchema), async(req: Request, res: Response) => {
  try {
    const { images, ...menu } = req.body;
    const createdMenu = await createMenu(menu);
    if(!createdMenu) return res.status(400).json({
      message: 'Failed to create menu'
    });
    const createdImages = await createMenuImages({menuId: String(createdMenu._id), images});
    if(!createdImages) return res.status(400).json({
      message: 'Failed to create images'
    });
    res.status(200).json({...createdMenu.toObject(), images: createdImages});
  } catch (error) {
    res.status(500).json(error)
  }
});

menuRouter.put('/:id', validateSchema(updateMenuSchema), async(req: Request, res: Response) => {
  try {
    const menuId = req.params.id;
    const { images, ...menu} = req.body;
    const updatedMenu = await updateMenuById({menuId, ...menu});
    if(!updatedMenu) return res.status(400).json({
      message: 'Failed to update menu'
    });
    const deletedImages = await deleteMenuImages(menuId);
    const createdImages = await createMenuImages({ menuId, images });
    if(!deletedImages || !createdImages) return res.status(400).json({
      message: 'Failed to update menu images',
    });
    res.status(200).json({...updatedMenu.toObject(), images: createdImages});
  } catch (error) {
    res.status(500).json(error);
  }
});

menuRouter.put('/status/:id', validateSchema(updateMenuStatusSchema), async(req: Request, res: Response) => {
  try {
    console.log('Update status')
    const menuId = req.params.id;
    const { status } = req.body; 
    const updated = await updateMenuStatus({menuId, status});
    if(!updated) return res.status(400).json({
      message: 'Failed to update menu status',
    });
    res.status(200).json(updated);
  } catch(error) {
    res.status(500).json(error);
  }
});

menuRouter.get('/', validateSchema(getBusinessMenusSchema), async(req: Request, res: Response) => {
  try {
    const businessId = req.query.bid;
    const menus = await getMenusByBusinessId(String(businessId));
    if(!menus) return res.status(400).json({
      message: 'Failed get menus'
    });
    res.status(200).json(menus);
  } catch(error) {
    res.status(200).json(error)
  }
});

menuRouter.get('/:id', validateSchema(getMenuSchema), async(req: Request, res: Response) => {
  try {
    const menuId = req.params.id;
    const menu = await getMenuById(menuId);
    if(!menu) return res.status(400).json({
      message: 'Failed to get menu',
    });
    res.status(200).json(menu[0]);
  } catch(error) {
    res.status(500).json(error);
  }
})

export default menuRouter;
