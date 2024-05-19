import multer from 'multer';
import * as cloudinaryConfig from '../configs/cloudinary.js';

// define function
const uploadCloudAvatar = multer({ storage: cloudinaryConfig.storageAvatar });

export { uploadCloudAvatar };
