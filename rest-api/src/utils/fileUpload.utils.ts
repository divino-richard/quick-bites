import fs from 'fs';
import multer from 'multer';
import { storage } from '../middleware/upload';
import { isValidObjectId } from 'mongoose';

export const businessLicenseUpload = multer({
    storage, 
    fileFilter: (req, file, callback) => {
        const acceptedFileType = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

        if(!req.body?.businessId || !isValidObjectId(req.body?.businessId)) {
            callback(new Error('Invalid business id'));
            return;
        }

        if(!acceptedFileType.includes(file.mimetype)) {
            callback(new Error('File type should be in .pdf, .doc, or .docx format'));
            return;
        }

        callback(null, true);
    }, 
    limits: {
        fileSize: 500000
    },
}).single('businessLicense');

export const taxRegistrationUpload = multer({
    storage, 
    fileFilter: (req, file, callback) => {
        const acceptedFileType = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        if(!req.body?.businessId || !isValidObjectId(req.body?.businessId)) {
            callback(new Error('Invalid business id'));
            return;
        }

        if(!acceptedFileType.includes(file.mimetype)) {
            callback(new Error('File type should be in .pdf, .doc, or .docx format'));
            return;
        }

        callback(null, true);
    }, 
    limits: {
        fileSize: 500000
    },
}).single('taxRegistration');
