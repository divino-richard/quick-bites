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
            status: 'available'
        });
        res.status(201).json(createdFoodMenu);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export async function getFoodMenus(req: Request, res: Response) {
    try {
        const { skip, limit} = req.params;

        const foodMenus = await FoodMenu.find()
            .sort({createdAt: 'desc'})
            .skip(Number(skip))
            .limit(Number(limit));

        res.status(200).json(foodMenus);

    } catch(error) {
        res.status(500).json({
            message: "Internal server error",   
        })
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

export async function updateFoodMenuImage(req: Request, res: Response) {
    try {
        const foodMenu = await FoodMenu.findOneAndUpdate(
            { _id: req.params.id },
            { 
                imageFileName: req.file?.filename,
                image: `${process.env.BASE_URL}/uploads/${req.file?.filename}`
            }
        );

        const imagePath = `${ROOT_DIRECTORY}/src/uploads/${foodMenu?.imageFileName}`;
        fs.unlink(imagePath, (error) => {
            if(error) {
                throw new Error(error.message)
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

export async function searchFoods (req: Request, res: Response) {
    try {
        const searchKey = req.params.key;
        const foods = await FoodMenu.find().where('name').regex(new RegExp(searchKey, 'i'));
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function updateFoodMenuStatus(req: Request, res: Response) {
    try {
        const status = req.body.status;
        const id = req.params.id;
        
        const updatedFoodMenu = await FoodMenu.findOneAndUpdate({ _id: id }, { status }, { new: true });
        
        if(!updatedFoodMenu) {
            res.status(400).json({
                message: "Can't find and update food menu"
            });
            return;
        }

        res.status(200).json(updatedFoodMenu);
    } catch (error) {
        res.status(200).json({
            message: "Internal server error"
        });
    }
}