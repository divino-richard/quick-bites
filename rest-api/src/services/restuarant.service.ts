import RestaurantModel from "../model/Restaurant";

interface ICreateRestaurant {
  merchant: string;
  name: string;
  type: string;
  specialFeature: string;
  registrationNumber: number;
  taxIdNumber: number;
  address: {
    formatted: string;
    street?: string;
    city: string;
    postalCode: string;
    country:string;
    location: {
      lat: number;
      lng: number;
    }
  }
}
export async function createRestaurant(params: ICreateRestaurant) {
  return await RestaurantModel.create(params);
}

interface IGetRestaurants {
  merchant: string
}
export async function getRestaurants(params: IGetRestaurants) {
  const { merchant } = params;
  return RestaurantModel.find({ merchant }).limit(10);
}

interface IGetRestaurantById {
  id: string;
}
export async function getRestaurantById(params: IGetRestaurantById) {
  const { id } = params;
  return await RestaurantModel.findById(id);
}