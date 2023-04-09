import { Request, Response } from 'express';
import { setUpPem, verifyAccessToken } from '../middlewares/authMiddleware';
import { AuthController } from '../modules/auth/auth.controller';
import { UserController } from '../modules/users/user.controller';

const userController = new UserController();
const authController = new AuthController();

export const noAuthRoutes = [
  {
    path: '/nats-test/',
    middleware: [],
    action: () => {
      
    },
  },
  {
    path: '/auth/',
    middleware: [],
    action: authController.routes(),
  }
];

export const AppRoutes = [
  {
    path: '/user/',
    middleware: [setUpPem, verifyAccessToken],
    action: userController.routes(),
  },
];
