import mongoose from "mongoose";
import { Types } from "mongoose";

const { Schema } = mongoose;

const menuImageSchema = new Schema({
  menuId: {
    type: Types.ObjectId,
    ref: 'Menu'
  },
  imageUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const MenuImageModel = mongoose.model('MenuImage', menuImageSchema);
