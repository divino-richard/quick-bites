import multer, { FileFilterCallback } from "multer";
import { validateFoodMenuItem } from "../../validator/foodMenu.validator";
import { ZodError } from "zod";
import { Request } from "express";
import storage from "./storage.utils";

async function foodMenuFileFilter (req: Request, file: Express.Multer.File, callback: FileFilterCallback){
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