import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

const UserType = {
  values: ['admin', 'customer', 'rider', 'merchant'],
  message: "Invalid user type"
};
const ValidIdStatus = {
  values: ['idle', 'approved', 'denied'],
  message: 'Invalid ID status'
}
const ValidIdType = {
  values: ['umid', 'national-id', 'passport', 'driver-license'],
  message: 'Invalid ID type'
}
const IdSide = {
  values: ['front', 'back'],
  message: 'Invalid ID side'
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    rquired: true
  },
  userType: {
    type: String,
    enum: UserType
  },
  avatar: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  addresses: [{
    formatted: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: false
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    location: {
      type: Object,
      required: false
    }
  }],
  validIds: [{
    filename: {
      type: String,
      required: true
    },
    file: {
      type: String,
      required: true
    },
    idSide: {
      type: String,
      enum: IdSide,
    },
    idType: {
      type: String,
      enum: ValidIdType,
    },
    status: {
      type: String,
      enum: ValidIdStatus,
    }
  }]
}, {
  timestamps: true
});

export const UserModel = mongoose.model('User', userSchema);