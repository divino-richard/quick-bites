import { Request, Response } from "express";
import { FoodMenu } from "../model/FoodMenu";

export async function addFoodMenu(req: Request, res: Response) {
    try {
        const createdFoodMenu = await FoodMenu.create({
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