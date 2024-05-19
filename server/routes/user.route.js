import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as auth from '../middlewares/jwt.middleware.js';
// import * as uploadCloud from '../middlewares/uploadCloud..middleware.js';

const route = express.Router();

route.get(
   '/',
   [auth.verifyAccessToken, auth.verifyAdmin],
   userController.getAllUsers,
);

route.post(
   '/create-user',
   [auth.verifyAccessToken, auth.verifyAdmin],
   userController.createUser,
);

route.post(
   '/toggle-active',
   [auth.verifyAccessToken],
   userController.toggleActiveUser,
);

route.put('/', [auth.verifyAccessToken], userController.updateUser);

export default route;
