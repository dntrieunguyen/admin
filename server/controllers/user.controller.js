import { User } from '../models/User.js';
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

const deActiveUser = async (req, res, next) => {
   try {
      const user = req.body;
   } catch (error) {
      next(error);
   }
};

const getAllUsers = async (req, res, next) => {
   try {
      const data = await User.find();
      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: HTTP_MESSAGES.OK,
         data,
      });
   } catch (error) {
      next(error);
   }
};

const editUser = async (req, res, next) => {
   try {
   } catch (error) {
      next(error);
   }
};

export { createUser, getAllUsers };
