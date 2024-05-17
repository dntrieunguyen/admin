import { HTTP_CODES, HTTP_MESSAGES } from '../utils/messages.js';

// CRUD
const createUser = async (req, res, next) => {
   try {
      const data = req.body;
      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: HTTP_MESSAGES[HTTP_CODES.CREATED],
         data,
      });
   } catch (error) {
      next(error);
   }
};

export { createUser };
