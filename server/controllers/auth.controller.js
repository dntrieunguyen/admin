import { generateAccessToken } from '../middlewares/jwt.middleware.js';
import { User } from '../models/User.js';
import { handleValidationErrors } from '../utils/helpers.js';
import { HTTP_CODES, MESSAGE } from '../utils/messages.js';

const logIn = async (req, res, next) => {
   try {
      // validate data
      if (handleValidationErrors(req, res)) return;

      const response = await User.findOne({ email: req.body.email });

      //   Tạo cookie
      const accessToken = generateAccessToken(response._id, response.role);

      res.cookie('accessToken', accessToken, {
         maxAge: 3 * 24 * 60 * 60 * 1000,
         httpOnly: true,
         secure: true,
      });

      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: MESSAGE.LOGIN,
         accessToken,
      });
   } catch (error) {
      next(error);
   }
};
const logOut = async (req, res, next) => {
   try {
      res.clearCookie('accessToken');
      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: MESSAGE.LOGOUT,
      });
   } catch (error) {
      next(error);
   }
};
const register = async (req, res, next) => {
   try {
      const data = req?.body;
      console.log(req.body);
      // validate data
      if (handleValidationErrors(req, res)) return;
      const newUser = new User(data);
      await newUser.save();
      return res.status(HTTP_CODES.CREATED).json({
         success: true,
         message: MESSAGE.REGISTER,
         data: newUser,
      });
   } catch (error) {
      next(error);
   }
};
export { register, logOut, logIn };
