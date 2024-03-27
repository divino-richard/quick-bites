import { Request, Response } from "express";
import { BusinessModel } from "../model/Business";
import { BankAccountModel } from "../model/BankAccount";
import { BusinessDocument } from "../model/BusinessDocument";

export async function completeRegistration (req: Request, res: Response) {
    try {
        const {
            businessName, 
            businessType, 
            businessRegistrationNumber, 
            taxIdNumber, 
            businessAddress,
            bankName,
            bankHolderName,
            bankAccountNumber
        } = req.body;

        const foundBusiness = await BusinessModel.findOne({name: businessName});
        if (foundBusiness) {
            return res.status(422).json({ message: 'Business already exist'});
        }

        const createdBusiness = await BusinessModel.create({
            userId: req.userData?.id,
            name: businessName,
            type: businessType,
            registrationNumber: businessRegistrationNumber,
            taxIdNumber: taxIdNumber,
            address: businessAddress,
        });
    
        const createdBankAccount = await BankAccountModel.create({
            userId: req.userData?.id,
            name: bankName,
            holderName: bankHolderName,
            accountNumber: bankAccountNumber,
        });
    
        res.status(200).json({
            createdBusiness,
            createdBankAccount,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong. Please try again later."
        });
    }
}

export async function addBusinessLicense(req: Request, res: Response) {
    try {
        const createdBusinessLicense = await BusinessDocument.create({
            businessId: req.body.businessId,
            filename: req.file?.filename,
            uri: `${process.env.BASE_URL}/uploads/${req.file?.filename}`,
            documentType: 'business-license',
            status: 'idle',
        });
        res.status(201).json(createdBusinessLicense);
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong. Please try again later.'
        });
    }
}

export async function addTaxRegistration(req: Request, res: Response) {
    try {
        const createdTaxRegistration = await BusinessDocument.create({
            businessId: req.body?.businessId,
            filename: req.file?.filename,
            uri: `${process.env.BASE_URL}/uploads/${req.file?.filename}`,
            documentType: 'tax-registration',
            status: 'idle',
        })
        res.status(201).json(createdTaxRegistration)
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, Please try again later."
        })
    }
}

export async function getBusiness(req: Request, res: Response) { 
    try {
        const userId = req.userData?.id;
        const business = await BusinessModel.findOne({userId});
        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong. Please try again later',
        })
    }
}
