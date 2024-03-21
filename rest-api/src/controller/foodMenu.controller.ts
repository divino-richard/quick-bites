import { Request, Response } from "express";
import { FoodMenu } from "../model/FoodMenu";

export async function addFoodMenu(req: Request, res: Response) {
    try {
        const userId = req.userData?.id; 
        const createdFoodMenu = await FoodMenu.create({
            userId,
            ...req.body, 
            image:  `${process.env.BASE_URL}/uploads/${req.file?.filename}`
        });
        res.status(201).json(createdFoodMenu);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function getFoodMenusByUserId(req: Request, res: Response) {
    try {
        const userId = req.userData?.id;
        const foodMenus = await FoodMenu.find({userId}).sort({createdAt: 'desc'});
        res.status(200).json(foodMenus);
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}