import mongoose from 'mongoose';

const { Schema } = mongoose;

export const User = mongoose.model(
   'User',
   new Schema(
      {
         fullName: {
            type: String,
            required: true,
            unique: true,
         },
         email: {
            type: String,
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
         },
         birthDate: {
            type: Date,
         },
         role: {
            type: Boolean,
            default: false,
         },
         deletedAt: {
            type: Date,
         },
      },
      { timestamps: true },
   ),
);
