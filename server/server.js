import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnect } from './configs/dbConnect.js';
import { initRoutes } from './routes/index.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 8888;

app.use(
   cors({
      origin: process.env.CLIENT_URL,
      methods: ['POST', 'GET', 'PUT', 'DELETE', 'HEAD'],
   }),
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

initRoutes(app);

dbConnect();

app.listen(port, () => {
   console.log(`server is running on ${port}`);
});