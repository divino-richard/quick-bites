import { UserModel } from "../model/User";

export async function getUserByEmail(email: string) {
  return await UserModel.findOne({ email });
}

interface ICreateUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;
  email: string;
  password: string;
}
export async function createUser(params: ICreateUser) {
  return await UserModel.create(params);
}

interface IGetUsers {
  skip: number,
  limit: number
}
export async function getUsers(params: IGetUsers) {
  const { skip, limit } = params;
  const data = await UserModel.find().skip(skip).limit(limit).select('-password');
  const totalCount = await UserModel.countDocuments();
  return { data, totalCount }
}
