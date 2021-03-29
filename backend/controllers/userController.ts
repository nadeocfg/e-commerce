import User from '../schemas/userSchema';
import express, { NextFunction, Request, Response } from 'express';
import { SHA256 } from 'crypto-js';
import generateJwt from '../utils/generateToken';
import { UserRequest } from '../models/UserRequestModel';

// @desc   Auth user, get token
// @route  POST /api/users/login
// @access Public
const authUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (user && (await user.checkPassword(password))) {
      response.json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateJwt(user._id),
      });
    } else {
      response.status(404);
      response.json({
        message: `Incorrect email or password`,
      });
    }
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
    next(`Error: ${error.message}`);
  }
};

// @desc   Signup user
// @route  POST /api/users/signup
// @access Public
const signupUser = async (request: Request, response: Response) => {
  try {
    const { email, password, name } = request.body;

    const user = await User.create({
      email,
      name,
      password: SHA256(password),
      isAdmin: false,
    });

    if (user) {
      response.json({
        message: 'User created',
      });
    } else {
      response.status(500);
    }
  } catch (error) {
    const { email } = request.body;
    response.status(500);
    response.json({
      message: `${email} is already exist`,
    });
    console.error(`Error: ${error.message}`);
  }
};

// @desc   Get user by token
// @route  GET /api/users/profile
// @access Private
const getUserByToken = (request: UserRequest, response: Response) => {
  try {
    response.status(200);
    response.json(request.user);
  } catch (response) {
    console.error(`Error: ${response.message}`);
    response.status(401);

    response.json({
      message: `Error: ${response.message}`,
    });
  }
};

export { authUser, signupUser, getUserByToken };
