import { Request, Response } from 'express';
import { UserController } from '../modules/payment/payment.controller';

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
