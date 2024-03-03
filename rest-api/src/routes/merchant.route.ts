import express, { Request, Response } from 'express';
import { validateRegistrationCompletion } from '../middleware/validator/mechant.validator';
import { addBusinessLicense, addTaxRegistration, completeRegistration } from '../controller/merchant.controller';
import multer from 'multer';
import { validationResult } from 'express-validator';
import { businessLicenseUpload, taxRegistrationUpload } from '../utils/fileUpload.utils';

const merchantRoute = express.Router();

merchantRoute.post(
    '/registration/completion', 
    validateRegistrationCompletion,
    async (req: Request, res: Response) => {
        const validatorErrors = validationResult(req);
        if (!validatorErrors.isEmpty()) {
            return res.status(422).json({ message: validatorErrors.array()[0].msg});
        }

        completeRegistration(req, res);
    }
);

merchantRoute.post(
    '/business-license', 
    (req: Request, res: Response) => {
        businessLicenseUpload(req, res, function (error) {
            if (error instanceof multer.MulterError) {
                return res.status(402).json({message: error.message})
            } else if (error instanceof Error) {
                return res.status(402).json({message: error.message})
            }  
            
            if(!req.file) {
                return res.status(402).json({message: "No file exist"})
            }
        
            addBusinessLicense(req, res);
        })
    }
);

merchantRoute.post(
    '/tax-registration', 
    (req: Request, res: Response) => {
        taxRegistrationUpload(req, res, function (error) {
            if (error instanceof multer.MulterError) {
                return res.status(402).json({message: error.message})
            } else if (error instanceof Error) {
                return res.status(402).json({message: error.message})
            }            
            
            if(!req.file) {
                return res.status(402).json({message: "No file exist"})
            }

            addTaxRegistration(req, res);
        })
    }
);

export default merchantRoute;
