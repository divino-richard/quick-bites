
import mongoose from 'mongoose'

const { Schema } = mongoose

const DocumentStatus = {
    values: ['idle', 'onprocessed', 'verified', 'denied'],
    message: 'Invalid document status'
}

const documentFiles = new Schema({
    userId: String,
    name: String,
    path: String,
    status: {
        type: String,
        enum: DocumentStatus
    },
}, {
    timestamps: true
})

export const DocumentFilesModel = mongoose.model('DocumentFiles', documentFiles)
