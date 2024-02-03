import { UserModel } from "../model/User"
import {User} from "../types/user.types";

export const user = {
    async create(data: User) {
        return await UserModel.create(data)
    },  
    async getAll() {
        const users = await UserModel.find();
        return users;
    },
    async getByEmail(email: string) {
        const user = await UserModel.findOne({ email })
        return user
    }
}