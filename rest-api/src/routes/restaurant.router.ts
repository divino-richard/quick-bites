import express, { Request, Response } from 'express';
import { validateSchema } from '../schema';
import { createRestaurantSchema, getRestaurantSchema } from '../schema/restaurant.schema';
import { createRestaurant, getRestaurantById, getRestaurants } from '../services/restuarant.service';

const restaurantRouter = express.Router();

restaurantRouter.post('/', validateSchema(createRestaurantSchema), async(req: Request, res: Response) => {
  try {
    const merchantId = req.userData?._id;
    const restaurant = await createRestaurant({
      merchant: String(merchantId),
      ...req.body
    });
    if(!restaurant) return res.status(400).json({
      message: 'Failed to create business'
    });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json(error);
  }
});

restaurantRouter.get('/', async(req: Request, res: Response) => {
  try {
    const merchantId = req.userData?._id;
    const restaurant = await getRestaurants({merchant: String(merchantId)});
    if(!restaurant) {
      res.status(400).json({
        message: 'Failed to get restaurant'
      });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json(error);
  }
});

restaurantRouter.get('/:id', validateSchema(getRestaurantSchema), async(req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const restaurant = await getRestaurantById({id});
    if(!restaurant) return res.status(400).json({
      message: 'Failed to get restaurant'
    });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default restaurantRouter;