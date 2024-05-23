import { User } from '../models/User.js';
import { HTTP_CODES, HTTP_MESSAGES, MESSAGE } from '../utils/messages.js';
import { v2 as cloudinary } from 'cloudinary';
import { sendMail } from '../utils/sendMail.js';
import { createError } from '../utils/helpers.js';

// CRUD
const createUser = async (req, res, next) => {
   try {
      const data = req.body;
      const newData = new User(data);
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser)
         return next(
            createError(HTTP_CODES.BAD_REQUEST, 'Email đã được sử dụng'),
         );
      await newData.save();
      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: HTTP_MESSAGES[HTTP_CODES.CREATED],
         results: newData,
      });
   } catch (error) {
      next(error);
   }
};

const uploadAvatar = async (req, res, next) => {
   try {
      if (!req?.file)
         return next(
            createError(HTTP_CODES.BAD_REQUEST, MESSAGE.CAN_NOT_UPLOAD_AVATAR),
         );

      const img_url = req?.file?.path;
      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: MESSAGE.UPLOAD_AVATAR_SUCCESSFULLY,
         img_url,
      });
   } catch (error) {
      next(error);
   }
};

const changeAvatar = async (req, res, next) => {
   try {
      const img_url = req?.file?.path;
      const delAvatar = req?.body?.del_avatar
         .match(/admin\/avatars\/[^/]+/)[0]
         .replace(/\.[^/.]+$/, '');

      cloudinary.uploader.destroy(delAvatar);

      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: MESSAGE.CHANGE_AVATAR_SUCCESSFULLY,
         img_url,
      });
   } catch (error) {
      next(error);
   }
};

const toggleActiveUser = async (req, res, next) => {
   try {
      const { id } = req?.body;

      const response = await User.findById(id);

      const updateUser = {
         ...response.toObject(),

         deletedAt: new Date().toISOString().slice(0, 10),
      };

      if (response?.deletedAt === null) {
         await User.updateOne(
            { _id: id },
            { $set: { deletedAt: Date.now() } },
            { new: true },
         );

         const html = `Tài khoản ${updateUser?.email} đã bị khoá vào lúc ${updateUser?.deletedAt}`;
         const data = {
            email: updateUser?.email,
            html,
         };

         await sendMail(data);

         return res.status(HTTP_CODES.OK).json({
            success: true,
            message: `Thành công. Đã xoá tài khoản ${updateUser?.email}`,
         });
      }

      await User.updateOne(
         { _id: id },
         { $set: { deletedAt: null } },
         { new: true },
      );

      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: `Thành công. Đã kích hoạt tài khoản ${updateUser?.email}`,
      });
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
         results: data,
      });
   } catch (error) {
      next(error);
   }
};

const updateUser = async (req, res, next) => {
   try {
      const data = req?.body;
      const { id } = req?.query;

      const currUser = await User.findById(id);
      // Xoá ảnh cũ trong cloud
      const delAvatar = currUser.avatar
         .match(/admin\/avatars\/[^/]+/)[0]
         .replace(/\.[^/.]+$/, '');

      cloudinary.uploader.destroy(delAvatar);

      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });

      return res.status(HTTP_CODES.OK).json({
         success: true,
         message: 'User đã được update',
         updateUser,
      });
   } catch (error) {
      next(error);
   }
};

export {
   createUser,
   getAllUsers,
   updateUser,
   toggleActiveUser,
   changeAvatar,
   uploadAvatar,
};
