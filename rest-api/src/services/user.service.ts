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
  userType?: string,
  skip: number,
  limit: number
}
export async function getUsers(params: IGetUsers) {
  const { userType, skip, limit } = params;
  let filter = {};
  if(userType) {
    filter = { userType }
  }
  const data = await UserModel.find({...filter})
    .skip(skip)
    .limit(limit)
    .select('-password');
  const totalCount = await UserModel.countDocuments({...filter});
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