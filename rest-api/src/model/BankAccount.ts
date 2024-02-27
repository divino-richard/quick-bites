import mongoose from 'mongoose'

const { Schema } = mongoose

const bankAccountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    bankName: String,
    holderName: String,
    accountNumber: String,
}, {
    timestamps: true
})

export const BankAccountModel = mongoose.model('Finance', bankAccountSchema);
