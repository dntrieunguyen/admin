import express from 'express';
import { createUser } from '../controllers/user.controller.js';

const route = express.Router();

route.post('/create-user', createUser);

export default route;
