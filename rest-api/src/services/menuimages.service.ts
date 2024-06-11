import { Types } from "mongoose";
import { MenuImageModel } from "../model/MenuImage";
import { MenuModel } from "../model/Menu";

interface IMenuImage {
  imageUrl: string;
  fileName: string;
}
interface ICreateMenuImages {
  menuId: string;
  images: IMenuImage[]
}
export async function createMenuImages(params: ICreateMenuImages) {
  const { menuId, images} = params;
  const createPromises = images.map(async(image) => {
    return await MenuImageModel.create({ menuId, ...image })
  });
  return await Promise.all(createPromises);
}

export async function deleteMenuImages(menuId: string) {
  return await MenuImageModel.deleteMany({ menuId });
}

type MenuStatusType = 'available' | 'unavailable';
interface IUpdateMenuStatus {
  menuId: string;
  status: MenuStatusType;
}
export async function updateMenuStatus(params: IUpdateMenuStatus) {
  const { menuId, status} = params;
  return await MenuModel.findByIdAndUpdate(menuId, { status }, { new: true });
}
