import express from 'express';
import {
  authUser,
  signupUser,
  getUserByToken,
} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const userRoutes = express.Router();

userRoutes.post('/login', authUser);
userRoutes.post('/signup', signupUser);

userRoutes.route('/profile').get(protect, getUserByToken);

export default userRoutes;
