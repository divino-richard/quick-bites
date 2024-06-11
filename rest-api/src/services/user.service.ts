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
  registrationStatus: string;
}
export async function createUser(params: ICreateUser) {
  return await UserModel.create(params);
}