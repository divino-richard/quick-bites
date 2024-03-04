import mongoose from 'mongoose';

const { Schema } = mongoose;

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

const validIdSchema = new Schema({
    userId: String,
    filename: String,
    uri: String,
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
}, {
    timestamps: true
})

export const ValidId = mongoose.model('ValidId', validIdSchema);

