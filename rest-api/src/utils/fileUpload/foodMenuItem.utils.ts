import multer, { FileFilterCallback } from "multer";
import { validateFoodMenuItem } from "../../validator/foodMenu.validator";
import { ZodError } from "zod";
import { Request } from "express";
import storage from "./storage.utils";
import mongoose from "mongoose";
import { FoodMenu } from "../../model/FoodMenu";

async function foodMenuFileFilter (req: Request, file: Express.Multer.File, callback: FileFilterCallback){
    if(req.method === 'POST') {
        try {
            validateFoodMenuItem.parse(req.body);
            callback(null, true);
        } catch(error) {
            if(error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message.toLowerCase()}`,
                }))
                callback(new Error(errorMessages[0].message));
            } else {
                callback(new Error('Internal server error'));
            }
        }
    }

    if(req.method === 'PUT') {
        if(!mongoose.isValidObjectId(req.params.id)) {
            callback(new Error('Invalid parameter'));
            return;            
        }

        const foundFoodMenu = await FoodMenu.findById(req.params.id);
        if (!foundFoodMenu) {
            callback(new Error("Can't find an item"));
            return;
        }

        callback(null, true);
    }
}

const limits = {
    fileSize: 1 * 1000 * 1000,  // 1 MB
    files: 1,
};

const foodMenuItemUpload = multer({
    storage,
    limits, 
    fileFilter: foodMenuFileFilter
}).single('foodMenuImage');

export default foodMenuItemUpload;