import mongoose from 'mongoose';

const { Schema } = mongoose;

const FoodMenuStatus  = {
    values: ['available', 'unavailable'],
    message: 'Invalid food menu status',
}

const foodMenuSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    description: String,
    price: String,
    category: String,
    imageFileName: String,
    image: String,
    status: {
        type: String,
        enum: FoodMenuStatus,
    }
}, { timestamps: true });

export const FoodMenu = mongoose.model('FoodMenu', foodMenuSchema);
