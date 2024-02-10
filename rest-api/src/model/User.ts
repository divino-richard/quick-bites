import mongoose from "mongoose";

const { Schema } = mongoose;

const UserType = {
    values: ['customer', 'rider', 'merchant'],
    message: "Invalid user type"
};

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Frist name is required"],
    },
    lastName: String,
    phoneNumber: String,
    userType: {
        type: String,
        enum: UserType
    },
    email: String,
    password: String,
}, {
    timestamps: true
});

export const UserModel = mongoose.model('User', userSchema);