import { Request, Response } from 'express';
import { UserController } from '../modules/payment/payment.controller';

const userController = new UserController();

export const noAuthRoutes = [
  {
    path: '/',
    middleware: [],
    action: ()=>{},
  },
];

export const AppRoutes = [
  {
    path: '/user/',
    middleware: [],
    action: userController.routes(),
  },
];
