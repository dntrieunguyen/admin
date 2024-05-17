import { errHandler, notFound } from '../utils/helpers.js';
import user from './user.route.js';
import auth from './auth.route.js';

const initRoutes = app => {
   // declare API endpoint
   app.use('/api/user', user);
   app.use('/api/auth', auth);

   //    handle Error
   app.use(notFound);
   app.use(errHandler);
};

export { initRoutes };
