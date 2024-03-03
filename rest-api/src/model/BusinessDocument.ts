
import mongoose from 'mongoose'

const { Schema } = mongoose

const DocumentStatus = {
    values: ['idle', 'onprocessed', 'verified', 'denied'],
    message: 'Invalid document status'
}

const DocumentType = {
    values: ['business-license', 'tax-registration'],
    message: 'Invalid document type',
}

const businsesDocument = new Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
    },
    filename: String,
    uri: String,
    documentType: {
        type: String,
        enum: DocumentType
    },
    status: {
        type: String,
        enum: DocumentStatus
    },
}, {
    timestamps: true
})

export const BusinessDocument = mongoose.model('BusinessDocument', businsesDocument)
