import jwt from 'jsonwebtoken';
import { createError } from '../utils/helpers.js';
import { HTTP_CODES, MESSAGE } from '../utils/messages.js';
import { ROLE } from '../utils/role.js';

const generateAccessToken = (id, role) =>
   jwt.sign({ id, role }, process.env.SECRET, { expiresIn: '3d' });

const verifyAccessToken = (req, res, next) => {
   if (!req?.headers?.cookie) {
      return next(createError(HTTP_CODES.UNAUTHORIZED, MESSAGE.UNAUTHORIZED));
   } else {
      const token = req?.headers?.cookie.split('=').pop();

      jwt.verify(token, process.env.SECRET, (err, decode) => {
         if (err)
            next(createError(HTTP_CODES.UNAUTHORIZED, MESSAGE.UNAUTHORIZED));

         req.user = decode;
      });
   }
   next();
};

const verifyAdmin = (req, res, next) => {
   const user = req?.user;
   if (!(user.role === ROLE.ADMIN))
      next(
         createError(HTTP_CODES.UNAUTHORIZED, MESSAGE.DO_NOT_HAVE_PERMISSION),
      );

   next();
};

export { generateAccessToken, verifyAccessToken, verifyAdmin };
