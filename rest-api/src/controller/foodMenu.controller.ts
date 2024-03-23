import { Request, Response } from "express";
import { FoodMenu } from "../model/FoodMenu";
import fs from "fs";
import mongoose from "mongoose";
import { ROOT_DIRECTORY } from "../../_dirname";

export async function addFoodMenu(req: Request, res: Response) {
    try {
        const userId = req.userData?.id; 
        const createdFoodMenu = await FoodMenu.create({
            userId,
            ...req.body, 
            imageFileName: req.file?.filename,
            image:  `${process.env.BASE_URL}/uploads/${req.file?.filename}`,
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

export async function deleteFoodMenu(req: Request, res: Response) {
    try {
        const foodMenuId = req.params.id;

        if(!mongoose.isValidObjectId(foodMenuId)) {
            res.status(400).json({
                message: "Invalid provided parameter"
            });
            return;
        }

        const deleteFoodMenu = await FoodMenu.findByIdAndDelete(foodMenuId);
        
        if(!deleteFoodMenu) {
            res.status(400).json({
                message: "Can't find and delete an item",
            });
            return;
        }

        const imagePath = `${ROOT_DIRECTORY}/src/uploads/${deleteFoodMenu.imageFileName}`;
        fs.unlink(imagePath, (error) => {
            if(error) {
                res.status(500).json({
                    message: "Failed to delete the image"
                });
                return;
            }

            res.status(200).json({
                message: "Food menu deleted successfully",
            })
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}

export async function updateFoodMenu(req: Request, res: Response) {
    try {
        const foodMenuId = req.params.id;

        if(!mongoose.isValidObjectId(foodMenuId)) {
            res.status(400).json({
                message: "Invalid paramerter",
            });
            return;
        }

        const updateFoodMenu = await FoodMenu.findOneAndUpdate(
            { _id: foodMenuId }, 
            { ...req.body },
            { new: true }
        );

        if(!updateFoodMenu) {
            res.status(400).json({
                message: "Can't find and update item",
            });
            return;
        }

        res.status(200).json(updateFoodMenu);

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        })
    }
}