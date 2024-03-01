import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

export const validateRegistrationCompletion = [
    check('businessName')
        .exists().withMessage('Business name is required')
        .notEmpty().withMessage('Business name is required')
        .isString().withMessage('Invalid business name'),
    check('businessType')
        .exists().withMessage('Business type is required')
        .notEmpty().withMessage('Business type is required')
        .isString().withMessage('Invalid business type'),
    check('businessRegistrationNumber')
        .exists().withMessage('Registration number is required')
        .notEmpty().withMessage('Registration number is required')
        .isNumeric().withMessage('Invalid registration num ber'),
    check('businessAddress')
        .exists().withMessage('Business address is required')
        .notEmpty().withMessage('Business address is required')
        .isString().withMessage('Invalid business address'),
    check('bankName')
        .exists().withMessage('Bank name is required')
        .notEmpty().withMessage('Bank name is required')
        .isString().withMessage('Invalid bank name'),
    check('bankHolderName')
        .exists().withMessage('Holder name is required')
        .notEmpty().withMessage('Holder name is required')
        .isString().withMessage('Invalid holder name'),
    check('bankAccountNumber')
        .exists().withMessage('Account number is required')
        .notEmpty().withMessage('Account number is required')
        .isNumeric().withMessage('Invalid account number'),
    check('taxIdNumber')
        .exists().withMessage('Tax ID number is required')
        .notEmpty().withMessage('Tax ID number is required')
        .isNumeric().withMessage('Invalid tax ID number'),
    function (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (req.files) {
                const files = req.files as {[fieldname: string]: Express.Multer.File[]}; 
                
                fs.unlink(files['businessLicense'][0].path, (error) => {
                    if(error) {
                        console.log('Business license deletion error: ', error);
                    }
                });

                fs.unlink(files['taxRegistration'][0].path, (error) => {
                    if(error) {
                        console.log('Tax Registration deletion error: ', error);
                    }
                });

                fs.unlink(files['onwerIdentification'][0].path, (error) => {
                    if(error) {
                        console.log('Owner ID deletion error: ', error);
                    }
                });
            } 
            
            return res.status(422).json({ message: errors.array()[0].msg});
        }

        next();
    }
]
