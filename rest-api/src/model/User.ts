import mongoose from "mongoose";

const { Schema } = mongoose;

const UserType = {
    values: ['customer', 'rider', 'merchant'],
    message: "Invalid user type"
};

const RegistrationStatus = {
    values: ['initial', 'completed', 'approved', 'denied'],
    message: 'Invalid registration type',
}

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    userType: {
        type: String,
        enum: UserType
    },
    email: String,
    password: String,
    registrationStatus: {
        type: String,
        enum: RegistrationStatus,
    }
}, {
    timestamps: true
});

export const UserModel = mongoose.model('User', userSchema);