import { Request, Response } from "express";
import { BusinessModel } from "../model/Business";
import { BankAccountModel } from "../model/BankAccount";
import { DocumentFilesModel } from "../model/DocumentFiles";
import { validationResult } from "express-validator";
import { deleteMerchantDocuments } from "../utils/fileUpload.utils";

export const completeRegistration = async (req: Request, res: Response) => {
    try {
        const {
            id, 
            businessName, 
            businessType, 
            businessRegistrationNumber, 
            taxIdNumber, 
            businessAddress,
            bankName,
            bankHolderName,
            bankAccountNumber
        } = req.body;

        const files = req.files as {[fieldname: string]: Express.Multer.File[]};

        const validatorErrors = validationResult(req);
        if (!validatorErrors.isEmpty()) {
            deleteMerchantDocuments(files);
            return res.status(422).json({ message: validatorErrors.array()[0].msg});
        }

        const foundBusiness = await BusinessModel.findOne({name: businessName});
        if (foundBusiness) {
            deleteMerchantDocuments(files);
            return res.status(422).json({ message: 'Business already exist'});
        }

        const createdBusiness = await BusinessModel.create({
            userId: id,
            name: businessName,
            type: businessType,
            registrationNumber: businessRegistrationNumber,
            taxIdNumber: taxIdNumber,
            address: businessAddress,
        });
    
        const createdBankAccount = await BankAccountModel.create({
            userId: id,
            name: bankName,
            holderName: bankHolderName,
            accountNumber: bankAccountNumber,
        });
    
        const createdBusinessLicense = await DocumentFilesModel.create({
            userId: id,
            name: files['businessLicense'][0].filename,
            path: `${process.env.BASE_URL}/uploads/${files['businessLicense'][0].filename}`,
            status: 'idle'
        });
    
        const createdTaxRegistration = await DocumentFilesModel.create({
            userId: id,
            name: files['taxRegistration'][0].filename,
            path: `${process.env.BASE_URL}/uploads/${files['taxRegistration'][0].filename}`,
            status: 'idle'
        });
    
        const createdOnwerIdentification = await DocumentFilesModel.create({
            userId: id,
            name: files['onwerIdentification'][0].filename,
            path: `${process.env.BASE_URL}/uploads/${files['onwerIdentification'][0].filename}`,
            status: 'idle'
        });
    
    
        res.status(200).json({
            createdBusiness,
            createdBankAccount,
            createdBusinessLicense,
            createdTaxRegistration,
            createdOnwerIdentification
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Please try again later."
        });
    }
}
