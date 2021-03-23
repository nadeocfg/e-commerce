import express from 'express';
import { authUser, signupUser } from '../controllers/userController';

const userRoutes = express.Router();

userRoutes.post('/login', authUser);
userRoutes.post('/signup', signupUser);

export default userRoutes;
