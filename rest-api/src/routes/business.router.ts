import express, { Request, Response } from 'express';
import { createBusiness, getBusinessById, getBusinesses } from '../services/business.service';
import { createBusinessAddress } from '../services/businessaddress.service';
import { createBankAccount } from '../services/bankaccount.service';
import { Types } from 'mongoose';
import { validateSchema } from '../schema';
import { createBusinessSchema, getBusinessSchema } from '../schema/business.schema';

const businessRouter = express.Router();

businessRouter.post('/', validateSchema(createBusinessSchema), async(req: Request, res: Response) => {
  try {
    const merchantId = req.userData?.id;
    const { name, type, registrationNumber, bankName, bankHolderName, bankAccountNumber, taxIdNumber, address } = req.body;
    
    const business = await createBusiness({
      merchantId: new Types.ObjectId(merchantId),
      name, 
      type, 
      registrationNumber, 
      taxIdNumber
    });
    if(!business) return res.status(400).json({
      message: 'Failed to create business'
    });

    const bankAccount = await createBankAccount({ 
      userId: new Types.ObjectId(merchantId), 
      name: bankName,
      holderName: bankHolderName,
      accountNumber: bankAccountNumber
    })
    if(!bankAccount) return res.status(400).json({
      message: 'Failed to create bank account'
    });

    const businessAddress = await createBusinessAddress({
      businessId: new Types.ObjectId(business._id), 
      address: address.formattedAddress,
      location: address.location
    });
    if(!businessAddress) res.status(400).json({
      message: 'Failed to create business address'
    });

    res.status(200).json({ ...business, address: businessAddress });

  } catch (error) {
    res.status(500).json(error);
  }
});

businessRouter.get('/', async(req: Request, res: Response) => {
  try {
    const merchantId = req.userData?.id;
    const businesses = await getBusinesses(String(merchantId));
    if(!businesses) {
      res.status(400).json({
        message: 'Failed to get businesses'
      });
    }
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json(error);
  }
});

businessRouter.get('/:id', validateSchema(getBusinessSchema), async(req: Request, res: Response) => {
  try {
    const businessId = req.params.id;
    const business = await getBusinessById(businessId);
    if(!business) return res.status(400).json({
      message: 'Failed to get business'
    });
    res.status(200).json(business[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default businessRouter;