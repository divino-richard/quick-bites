import multer from 'multer';
import { ROOT_DIRECTORY } from '../../../_dirname';

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${ROOT_DIRECTORY}/src/uploads/`);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const splitedName = file.originalname.split('.');
        const fileExtension = splitedName[splitedName.length-1];
        const newFileName = uniqueSuffix + '.' + fileExtension;
        cb(null, newFileName);
    }
})
