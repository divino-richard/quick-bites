import { Types } from "mongoose";
import { BankAccountModel } from "../model/BankAccount";

interface ICreateBankAccount {
  userId: Types.ObjectId;
  name: string;
  holderName: string;
  accountNumber: number;
}
export async function createBankAccount(params: ICreateBankAccount) {
  return await BankAccountModel.create(params);
} 