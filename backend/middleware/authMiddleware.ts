import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRequest } from '../models/UserRequestModel';
import User from '../schemas/userSchema';

const protect = async (
  request: UserRequest,
  response: Response,
  next: NextFunction
) => {
  let token = null;

  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = request.headers.authorization.slice(7);

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');

      request.user = await User.findById(decoded.id).select('-password');
    } catch {
      response.status(401);
      next(new Error('Cannot find user by token'));
    }
  }

  if (!request.headers.authorization) {
    response.status(401);
    next(new Error('No token'));
  }

  next();
};

export { protect };
