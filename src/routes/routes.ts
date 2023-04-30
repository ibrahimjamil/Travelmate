import { Request, Response } from 'express';
import { setUpPem, verifyAccessToken } from '../middlewares/authMiddleware';
import { AuthController } from '../modules/auth/auth.controller';
import { MeiliSearchController } from '../modules/meiliSearch/meiliSearch.controller';
import { TravelMatchController } from '../modules/traveler_match/travelmatch.controller';
import { UserController } from '../modules/users/user.controller';

const userController = new UserController();
const authController = new AuthController();
const meilisearchController = new MeiliSearchController();
const travelMatchController = new TravelMatchController();

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
  {
    path: '/matchTraveler/',
    middleware: [setUpPem, verifyAccessToken],
    action: travelMatchController.routes(),
  },
  {
    path: '/travelerRecommendations/',
    middleware: [setUpPem, verifyAccessToken],
    action: meilisearchController.routes(),
  }
];
