import { Types } from "mongoose";
import { BusinessAddressModel } from "../model/BusinessAddress";

interface ILocation {
  lat: number;
  lng: number;
}
interface ICreateBusinessAddress {
  businessId: Types.ObjectId;
  address: string;
  location: ILocation;
}
export async function createBusinessAddress(params: ICreateBusinessAddress) {
  return await BusinessAddressModel.create(params);
}