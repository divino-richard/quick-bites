import { Types } from "mongoose";
import { MenuModel } from "../model/Menu";

interface IGetRestaurantMenus {
  restaurant: string;
}
export async function getRestaurantMenus(params: IGetRestaurantMenus) {
  const { restaurant } = params;
  return await MenuModel.find({ restaurant });
}

interface IGetMenuById {
  id: string;
}
export async function getMenuById(params: IGetMenuById) {
  const { id } = params;
  return await MenuModel.findById(id);
}

interface IPrice {
  currency: string;
  value: number;
}
interface IMenuImage {
  imageUrl: string;
  fileName: string;
}
interface ICreateMenu {
  restaurant: string;
  name: string;
  description: string;
  price: IPrice;
  mealType: string;
  status: string;
  images: IMenuImage[]
}
export async function createMenu(params: ICreateMenu) {
  return await MenuModel.create(params);
}

interface IUpdateMenu {
  menuId: string;
  name: string;
  description: string;
  price: IPrice;
  mealType: string;
  status: string;
  images: IMenuImage[]
}
export async function updateMenuById(params: IUpdateMenu) {
  const { menuId, ...menu} = params;
  return await MenuModel.findByIdAndUpdate(
    menuId,
    { ...menu },
    { new: true }
  );
}

interface IUpdateMenuStatus {
  menuId: string;
  status: string;
}
export async function updateMenuStatus(params: IUpdateMenuStatus) {
  const { menuId, status } = params;
  return await MenuModel.findByIdAndUpdate(menuId, { status }, { new: true });
}

interface IDeleteMenu {
  id: string;
}
export async function deleteMenu(params: IDeleteMenu) {
  const { id } = params;
  return await MenuModel.findByIdAndDelete(id);
}

interface IGetMenus {
  skip?: number;
  limit?: number;
}
export async function getMenus(params: IGetMenus) {
  const { skip, limit } = params;
  const data = await MenuModel.find().skip(Number(skip)).limit(Number(limit));
  const totalCount = await MenuModel.countDocuments();
  return { data, totalCount }
}

interface ISearchMenu {
  keyword: string;
}
export async function searchMenu(params: ISearchMenu) {
  const { keyword } = params;
  return await MenuModel.find({ name: new RegExp(keyword, 'i')})
}
