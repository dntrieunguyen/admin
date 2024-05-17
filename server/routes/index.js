import { errHandler, notFound } from '../utils/helpers.js';
import user from './user.route.js';

const initRoutes = app => {
   // declare API endpoint
   app.use('/api/user', user);

   //    handle Error
   app.use(notFound);
   app.use(errHandler);
};

export { initRoutes };
