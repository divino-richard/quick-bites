import mongoose, { Types } from "mongoose"

const { Schema } = mongoose;

const DocumentStatus = {
  values: ['idle', 'onprocessed', 'verified', 'denied'],
  message: 'Invalid document status'
}

const DocumentType = {
  values: ['business-license', 'tax-registration'],
  message: 'Invalid document type',
}

const restaurantSchema = new Schema({
  merchant: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  specialFeature: {
    type: String,
    required: false
  },
  registrationNumber: {
    type: Number,
    required: true
  },
  taxIdNumber: {
    type: Number,
    required: true
  },
  address: {
    formatted: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    location: {
      type: Object,
      required: true
    }
  },
  documents: [{
    filename: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: DocumentType
    },
    status: {
      type: String,
      enum: DocumentStatus
    },
  }]
}, {
  timestamps: true
})

const RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

export default RestaurantModel;
