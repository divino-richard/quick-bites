import express, { NextFunction, Request, Response } from 'express';
import { validateRegistrationCompletion } from '../middleware/validator/mechant.validator';
import { validationResult } from 'express-validator';
import { upload } from '../middleware/upload';
import fs from 'fs';
import { BusinessModel } from '../model/Business';
import { BankAccountModel } from '../model/BankAccount';
import { DocumentFilesModel } from '../model/DocumentFiles';
import { ROOT_DIRECTORY } from '../../_dirname';
import { completeRegistration } from '../controller/merchant.controller';

const merchantRoute = express.Router();

merchantRoute.post(
    '/registration/completion', 
    upload.fields([
        { name: 'businessLicense', maxCount: 1 },
        { name: 'taxRegistration', maxCount: 1 },
        { name: 'onwerIdentification', maxCount: 1 },
    ]),
    validateRegistrationCompletion,
    async (req: Request, res: Response) => {
        if(!req.body || !req.files) {
            return res.status(400).json({message: 'Invalid data provided'});
        }

        completeRegistration(req, res);
    }
);

export default merchantRoute;
