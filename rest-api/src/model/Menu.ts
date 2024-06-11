import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

const MenuStatus  = {
    values: ['available', 'unavailable'],
    message: 'Invalid food menu status',
}

const menuSchema = new Schema({
    businessId: {
        type: Types.ObjectId,
        ref: "Business"
    },
    name: String,
    description: String,
    price: Object,
    category: String,
    status: {
        type: String,
        enum: MenuStatus,
    }
}, { timestamps: true });

export const MenuModel = mongoose.model('Menu', menuSchema);
