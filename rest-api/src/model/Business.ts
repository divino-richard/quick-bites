import mongoose from "mongoose"

const { Schema } = mongoose;

const businessSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    businessType: String,
    registrationNumber: String,
    taxIdNumber: String,
    address: String,
}, {
    timestamps: true
})

export const BusinessModel = mongoose.model('Business', businessSchema);
