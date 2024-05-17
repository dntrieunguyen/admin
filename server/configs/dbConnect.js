import mongoose from 'mongoose';

export const dbConnect = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO);
      console.log('MongoDB Connected');
   } catch (error) {
      throw new Error(error);
   }
};

mongoose.connection.on('connected', () => {
   console.log('connect to Database successfully');
});

mongoose.connection.on('disconnected', () => {
   console.log('connect to Database has disconnected');
});
