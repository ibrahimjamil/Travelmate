import { Router, Request, Response } from 'express';
import knexConnection from '../../../knexConnection';
import { verifyIdToken } from '../../middlewares/authMiddleware';
import UserService from '../users/user.service';

export class BuilderHistoryController {
  public router: Router;
  public userService = UserService;

  constructor() {
    this.router = Router();
    this.routes();
  }
  
  public getBuilderHistory = async (req: Request, res: Response) => {
    if (req.user.email) {
      const user = await this.userService.getOneUser(req.user.email);
      if (user) {

        const builderHistory =  await knexConnection[process.env.NODE_ENV || 'local']("builder_history")
        .where("user_id", user.id)
        .select("*");

        res.status(200).send({
          error: false,
          builder: builderHistory
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


  public routes() {
    this.router.get('/', verifyIdToken, this.getBuilderHistory);
    return this.router;
  }
}
