import { Router, Request, Response } from 'express';
import UserService from './payment.service';

export class UserController {
  public router: Router;
  public userService = UserService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  getAllUsers(req: any, res: any) {
    const users = [
      {
        email: 'user@example.com',
        name: 'Some merchant',
      },
      {
        email: 'email@example.com',
        name: 'Another merchant',
      },
    ];

    res.statusCode = 200;
    res.send({ users });
  }

  public getUser = async (req: any, res: any) => {
    if (req.user.email) {
      const user = await this.userService.getOneUser(req.user.email);
      if (user) {
        res.status(200).send({
          error: false,
          ...user,
        });
      } else {
        res.status(402).send({
          error: true,
          message: 'Email does not exists',
        });
      }
    } else {
      res.status(402).send({
        error: true,
        message: 'Email does not exists',
      });
    }
  };

  public updateUser = async (req: any, res: any) => {
    if (req.user.email) {
      const user = await this.userService.getOneUser(req.user.email);
      if (user) {
        const data = await this.userService.updateUser(user.id, { ...req.body });
        res.status(200).send({
          error: false,
          data,
        });
      } else {
        res.status(402).send({
          error: true,
          message: 'Email does not exists',
        });
      }
    } else {
      res.status(402).send({
        error: true,
        message: 'Email does not exist',
      });
    }
  };

  public routes() {
    this.router.get('/', this.getUser);
    this.router.patch('/update', this.updateUser);
    return this.router;
  }
}
