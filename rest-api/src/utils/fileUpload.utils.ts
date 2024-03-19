import multer from 'multer';
import { storage } from '../middleware/upload';
import { isValidObjectId } from 'mongoose';
import { validationResult } from 'express-validator';

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

export const userValidId = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const acceptedFileType = ['image/png', 'image/jpg', 'image/jpeg'];
        
        if(!req.body?.idType) {
            callback(new Error('Id type is required'));
            return;
        }

        if(!acceptedFileType.includes(file.mimetype)) {
            callback(new Error('File type should be in .png, .jpg, or .jpeg'));
            return;
        }

        callback(null, true);
    },
    limits: {
        fieldSize: 70000,
    },
}).fields([
    { name: 'front-id', maxCount: 1}, 
    { name: 'back-id', maxCount: 1 }
]);

export const foodMenuImageUpload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const acceptedFileType = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

        const validatorErrors = validationResult(req.body);
        if (!validatorErrors.isEmpty()) {
            callback(new Error(validatorErrors.array()[0].msg));
        }

        if(!acceptedFileType.includes(file.mimetype)) {
            callback(new Error('File type should be in .png, .jpg, .jpeg, or gif'));
            return;
        }

        callback(null, true);
    },
    limits: {
        fieldSize: 70000,
    },
}).single('foodMenuImage');
