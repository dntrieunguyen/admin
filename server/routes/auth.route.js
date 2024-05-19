import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as validator from '../utils/validator.js';
import * as authentication from '../middlewares/jwt.middleware.js';
import * as uploadCloud from '../middlewares/uploadCloud.middleware.js';

const route = express.Router();

route.post(
   '/register',
   [validator.validateRegisterUser()],
   authController.register,
);

route.post('/login', [validator.validateLoginUser()], authController.logIn);

route.post(
   '/logout',
   [authentication.verifyAccessToken],
   authController.logOut,
);

route.post(
   '/upload-avatar',
   [
      authentication.verifyAccessToken,
      uploadCloud.uploadCloudAvatar.single('avatar'),
   ],

   authController.uploadAvatar,
);

route.post(
   '/change-avatar',
   [],
   uploadCloud.uploadCloudAvatar.single('avatar'),
   authController.changeAvatar,
);

export default route;
