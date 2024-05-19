import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary config
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_KEY,
   api_secret: process.env.CLOUDINARY_SECRET,
});
// define cloudinary storage source
const storageAvatar = new CloudinaryStorage({
   cloudinary,
   allowedFormats: ['jpg', 'png'],
   params: {
      folder: 'admin/avatars',
   },
});

export { storageAvatar };
