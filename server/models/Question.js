import mongoose from 'mongoose';

const { Schema } = mongoose;

export const Question = mongoose.model(
   'Question',
   new Schema(
      {
         content: { type: String, required: true },
      },
      { timestamps: true },
   ),
);
