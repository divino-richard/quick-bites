import mongoose, { Types, model } from "mongoose";

const { Schema } = mongoose;

const businessAddressSchema = new Schema({
  businessId: {
    type: Types.ObjectId,
    ref: 'Business'
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true
  }
}, { timestamps: true });

export const BusinessAddressModel = model('BusinessAddress', businessAddressSchema);
