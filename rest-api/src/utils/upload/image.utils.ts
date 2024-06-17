import multer from "multer";
import storage from "./storage.utils";
import { ACCEPTED_IMAGES } from "../../constant/upload.constant";

const imageSizeLimit = 1 * 1000 * 1000; // 1 MB

export const uploadImages = multer({
  storage,
  limits: {
    fileSize: imageSizeLimit,
    files: 10
  },
  fileFilter(req, file, callback) {
    if(!ACCEPTED_IMAGES.includes(file.mimetype)) {
      callback(new Error('Invalid file type'));
      return;
    }
    callback(null, true);
  },
}).array('images');

export const uploadImage = multer({
  storage,
  limits: {
    fileSize: imageSizeLimit,
    files: 1
  },
  fileFilter(req, file, callback) {
    if(!ACCEPTED_IMAGES.includes(file.mimetype)) {
      callback(new Error('Invalid file type'));
      return;
    }
    callback(null, true);
  }
}).single('image');
