import { Router, Request, Response } from 'express';
import { verifyIdToken } from '../../middlewares/authMiddleware';
import TravelMatchService from './travelmatch.service';

export class TravelMatchController {
  public router: Router;
  public travelMatchService = TravelMatchService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public addUsersMatch = async (req: Request, res: Response) => {
    const user = await this.travelMatchService.addUsersMatch(req.body.user1, req.body.user2);
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

  public getUserMatches = async (req: Request, res: Response) => {
    const user = await this.travelMatchService.getUserMatches(req.user.email);
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
    this.router.get('/getUserMatches', this.getUserMatches)
    this.router.post('/addUsersMatch',  this.addUsersMatch);
    return this.router;
  }
}
