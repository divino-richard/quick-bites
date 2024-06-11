import { Types } from "mongoose";
import { MenuModel } from "../model/Menu";
import { param } from "express-validator";

export async function getMenusByBusinessId(businessId: string) {
  return await MenuModel.aggregate([
    {
      $match: {
        businessId: new Types.ObjectId(businessId)
      },
    },
    {
      $lookup: {
        from: 'menuimages',
        localField: '_id',
        foreignField: 'menuId',
        as: 'images'
      }
    }
  ]);
}

export async function getMenuById(id: string) {
  return await MenuModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(id)
      },
    },
    {
      $lookup: {
        from: 'menuimages',
        localField: '_id',
        foreignField: 'menuId',
        as: 'images'
      }
    }
  ]);
}

interface IPrice {
  currency: string;
  value: number;
}
interface ICreateMenu {
  businessId: string;
  name: string;
  description: string;
  price: IPrice;
  category: string;
  status: string;
}
export async function createMenu(params: ICreateMenu) {
  return await MenuModel.create(params);
}

interface IUpdateMenu {
  menuId: string;
  name: string;
  description: string;
  price: IPrice;
  category: string;
  status: string;
}
export async function updateMenuById(params: IUpdateMenu) {
  const { menuId, ...menu} = params;
  return await MenuModel.findByIdAndUpdate(
    menuId,
    { ...menu },
    { new: true }
  );
}

export async function deleteMenu(menuId: string) {
  return await MenuModel.findByIdAndDelete(menuId);
}

interface IGetMenus {
  skip?: number;
  limit?: number;
}
export async function getMenus(params: IGetMenus) {
  const { skip, limit } = params;
  return await MenuModel.aggregate([
    {
      $facet: {
        data: [
          {
            $lookup: {
              from: 'menuimages',
              localField: '_id',
              foreignField: 'menuId',
              as: 'images'
            }
          },
          {
            $skip: skip || 0,
          },
          {
            $limit: limit || 10,
          }
        ],
        totalCount: [
          {
            $count: 'count'
          }
        ]
      }
    },
    {
      $project: {
        data: 1,
        totalCount: { $arrayElemAt: ['$totalCount.count', 0]}
      }
    }
  ]);
}

export async function searchMenu(keyword: string) {
  return await MenuModel.aggregate([
    {
      $match: {
        name: { $regex: keyword, $options: 'i' }
      }
    },
    {
      $lookup: {
        from: 'menuimages',
        localField: '_id',
        foreignField: 'menuId',
        as: 'images'
      }
    },
    {
      $limit: 10,
    }
  ])
}
