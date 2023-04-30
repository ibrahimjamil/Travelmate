import { Router, Request, Response } from 'express';
import { verifyIdToken } from '../../middlewares/authMiddleware';
import UserService from './user.service';

export class UserController {
  public router: Router;
  public userService = UserService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  getAllUsers(req: Request, res: Response) {
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

  public getUser = async (req: Request, res: Response) => {
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

  public updateUser = async (req: Request, res: Response) => {
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

  public getOneUserById = async (req: Request, res: Response) => {
    const user = await this.userService.getUserById(req.query.id);
    console.log(user)
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
  };

  public routes() {
    this.router.get('/', verifyIdToken, this.getUser);
    this.router.get('/one', verifyIdToken, this.getOneUserById)
    this.router.patch('/update', verifyIdToken, this.updateUser);
    return this.router;
  }
}
