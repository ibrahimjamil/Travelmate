import { Request, Response } from 'express';
import { UserController } from '../modules/users/user.controller';

const userController = new UserController();

export const noAuthRoutes = [
  {
  },
];

export const AppRoutes = [
  {
    path: '/user/',
    middleware: [],
    action: userController.routes(),
  },
];
