import { Router, Request, Response } from 'express';
import MeiliSearchService from './meiliSearch.service';
import builderHistoryService from '../builderHistory/builderHistory.service';
import { verifyIdToken } from 'src/middlewares/authMiddleware';
import userService from '../users/user.service';
export class MeiliSearchController {
  public router: Router;
  public meiliSearchService = MeiliSearchService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public searchTravelers = async (req: Request, res: Response) => {
    try {
      const {
        pageNo,
        pageSize,
        query,
        travelerLocation,
        travelerGender,
        travelerStatus,
        toTravelPlaces,
        minimumQuantity,
        religion,
        ridePreference,
      } = req.query;
      const filterParams = {
        travelerLocation: JSON.parse(String(travelerLocation)),  // traveler own location
        travelerGender: JSON.parse(String(travelerGender)),
        toTravelPlaces: JSON.parse(String(toTravelPlaces)),     // where he want to travel
        ridePreference: JSON.parse(String(ridePreference)),
        minimumQuantity,
        travelerStatus,
        religion,
      }

      if (travelerLocation || travelerGender) {
        const message = `
          pageNo: ${pageNo},
          pageSize: ${pageSize},
          query: ${query},
          travelerLocation: ${travelerLocation},
          travelerGender: ${travelerGender},
          travelerStatus: ${travelerStatus},
          toTravelPlaces: ${toTravelPlaces},
          minimumQuantity: ${minimumQuantity},
          religion: ${religion},
          ridePreference: ${ridePreference}
        `;
        const user = await userService.getOneUser(req.user.email)
        await builderHistoryService.postBuilderHistory({
          message: message 
        }, user?.id)
      }

      const searchResult = await this.meiliSearchService
        .searchRecommendedTravelers(String(query), filterParams, Number(pageSize), Number(pageNo));
      res.status(200).send(searchResult);
    } catch (error: any) {
      res.status(500).send({
        error: true,
        message: error.message,
      })
    }
  }

  public routes() {
    this.router.get('/search', verifyIdToken ,this.searchTravelers);
    return this.router
  }
}
