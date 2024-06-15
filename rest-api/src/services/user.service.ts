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

interface IUpdateUser {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;
  email: string;
}
export async function updateUser(params: IUpdateUser) {
  const { userId, ...data } = params;
  return await UserModel.findByIdAndUpdate(userId, { ...data }, { new: true });
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

export async function searchUser(keyword: string) {
  const regex = new RegExp(keyword, 'i');
  return await UserModel.find({
    $or: [
      { firstName: { $regex: regex } },
      { lastName: { $regex: regex } }
    ]
  }).select('-password').limit(10);
}

export async function deleteUserById(id: string) {
  return await UserModel.findByIdAndDelete(id);
}