import mongoose, { Types } from "mongoose"

const { Schema } = mongoose;

const businessSchema = new Schema({
    merchantId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    name: String,
    type: String,
    registrationNumber: Number,
    taxIdNumber: Number,
}, {
    timestamps: true
})

export const BusinessModel = mongoose.model('Business', businessSchema);
