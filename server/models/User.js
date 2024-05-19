import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { ROLE } from '../utils/role.js';

const { Schema } = mongoose;

export const UserSchema = new Schema(
   {
      fullName: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      avatar: {
         type: String,
      },
      gender: {
         type: String,
         require: true,
      },
      birthDate: {
         require: true,
         type: Date,
      },
      role: {
         type: Number,
         default: ROLE.USER,
      },

      deletedAt: {
         type: Date,
      },
   },
   { timestamps: true },
);

UserSchema.pre('save', async function (next) {
   const user = this;

   // Chỉ băm mật khẩu nếu nó được thay đổi hoặc mới được tạo
   if (!user.isModified('password')) {
      return next();
   }

   try {
      // Sử dụng bcrypt để băm mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      // Gán mật khẩu đã băm vào trường password của người dùng
      user.password = hashedPassword;
      return next();
   } catch (error) {
      return next(error);
   }
});
UserSchema.pre('findOneAndUpdate', async function (next) {
   const user = this._update;

   try {
      // Sử dụng bcrypt để băm mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      // Gán mật khẩu đã băm vào trường password của người dùng
      user.password = hashedPassword;
      return next();
   } catch (error) {
      return next(error);
   }
});

// Tạo methods check password
UserSchema.methods.comparePassword = async function (password, next) {
   try {
      return await bcrypt.compare(password, this.password);
   } catch (error) {
      next(error);
   }
};
export const User = mongoose.model('User', UserSchema);
