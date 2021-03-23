import User from '../schemas/userSchema';
import express from 'express';
import { SHA256 } from 'crypto-js';

// @desc   Auth user, get token
// @route  POST /api/users/login
// @access Public
const authUser = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (user && (await user.checkPassword(password))) {
      response.json(user);
    } else {
      response.status(404).json({
        message: 'User not found or incorrect email/password',
      });
    }
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// @desc   Signup user
// @route  POST /api/users/signup
// @access Public
const signupUser = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { email, password, name } = request.body;

    const user = await User.create({
      email,
      name,
      password: SHA256(password),
      isAdmin: false,
    });

    console.log(user);

    if (user) {
      response.json({
        message: 'User created',
      });
    } else {
      response.status(404).json({
        message: user,
      });
    }
  } catch (error) {
    response.status(404).json({
      message: error.message,
    });
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export { authUser, signupUser };
