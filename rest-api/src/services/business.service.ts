import { Types } from "mongoose";
import { BusinessModel } from "../model/Business";

interface ICreateBusiness {
  merchantId: Types.ObjectId,
  name: string;
  type: string;
  registrationNumber: number;
  taxIdNumber: number;
}
export async function createBusiness(params: ICreateBusiness) {
  return await BusinessModel.create(params);
}

export async function getBusinesses(merchantId: string) {
  return await BusinessModel.find({ merchantId });
}

export async function getBusinessById(id: string) {
  return await BusinessModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(id)
      }
    },
    {
      $lookup: {
        from: 'bankaccounts',
        localField: 'merchantId',
        foreignField: 'userId',
        as: 'bankAccount'
      }
    },
    {
      $unwind: '$bankAccount'
    },
    {
      $lookup: {
        from: 'businessaddresses',
        localField: '_id',
        foreignField: 'businessId',
        as: 'businessAddress'
      }
    },
    {
      $unwind: '$businessAddress'
    }
  ])
}