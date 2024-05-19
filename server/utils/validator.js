import { check } from 'express-validator';
import { User } from '../models/User.js';

let validateRegisterUser = () => {
   return [
      // fullname
      check(['fullName'], 'Vui lòng điền đầy đủ fullName').notEmpty(),

      // email
      check('email', 'Sai định dạng Email').isEmail(),
      check('email').custom(async (value, { req }) => {
         //check email đã được sử dụng chưa
         const existingEmail = await User.findOne({ email: value });
         if (existingEmail) throw new Error(`${value} đã được sử dụng`);
      }),

      // password
      check('password', 'Password phải có nhiều hơn 6 ký tự').isLength({
         min: 6,
      }),

      // avatars

      // birthdate
      //   check('birthday', 'Vui lòng điền đầy đủ birthday').notEmpty(),

      // gender
      check('gender', 'Vui lòng điền đầy đủ gender').notEmpty(),
   ];
};

let validateLoginUser = () => {
   return [
      // email
      check('email', 'Sai định dạng Email').isEmail(),
      check(['email']).custom(async (value, { req }) => {
         //check email đã được sử dụng chưa
         const existingEmail = await User.findOne({ email: req.body.email });

         //  handle wrong email
         if (!existingEmail) throw new Error(`${req.body.email} Không tồn tại`);

         // handle wrong pasword
         if (existingEmail) {
            if (!(await existingEmail.comparePassword(req.body.password)))
               throw new Error('Password Không đúng');
         }
      }),

      // password
      check('password', 'Password phải có nhiều hơn 6 ký tự').isLength({
         min: 6,
      }),
   ];
};

let validateChangeAvatar = () => {
   return [check('avatar').custom(async (value, { req }) => {})];
};

export { validateRegisterUser, validateLoginUser };
