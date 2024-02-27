
import mongoose from 'mongoose'

const { Schema } = mongoose

const documentFiles = new Schema({
    name: String,
    path: String,
    status: String,
}, {
    timestamps: true
})

export const DocumentFilesModel = mongoose.model('DocumentFiles', documentFiles)
