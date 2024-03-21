import mongoose from 'mongoose';

const { Schema } = mongoose;

const foodMenuSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    description: String,
    price: String,
    category: String,
    image: String
}, { timestamps: true });

export const FoodMenu = mongoose.model('FoodMenu', foodMenuSchema);
