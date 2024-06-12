import mongoose from 'mongoose';

const { Schema } = mongoose;

const MenuStatus  = {
  values: ['available', 'unavailable'],
  message: 'Invalid food menu status',
}

const menuSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant"
  },
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Object,
    required: true
  },
  mealType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: MenuStatus,
  },
  images: [{
    imageUrl: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });

export const MenuModel = mongoose.model('Menu', menuSchema);
