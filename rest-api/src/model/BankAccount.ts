import mongoose from 'mongoose'

const { Schema } = mongoose

const bankAccountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: String,
    holderName: String,
    accountNumber: Number,
}, {
    timestamps: true
})

export const BankAccountModel = mongoose.model('BankAccount', bankAccountSchema);
