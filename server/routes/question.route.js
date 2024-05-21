import express from 'express';
import * as auth from '../middlewares/jwt.middleware.js';
import * as questionController from '../controllers/question.controller.js';
const route = express.Router();

route.get(
   '/',
   [auth.verifyAccessToken, auth.verifyAdmin],
   questionController.getAllQuestion,
);

route.post(
   '/create-question',
   [auth.verifyAccessToken, auth.verifyAdmin],
   questionController.createQuestion,
);
route.put(
   '/',
   [auth.verifyAccessToken, auth.verifyAdmin],
   questionController.updateQuestion,
);
route.delete(
   '/',
   [auth.verifyAccessToken, auth.verifyAdmin],
   questionController.deleteQuestion,
);

export default route;
