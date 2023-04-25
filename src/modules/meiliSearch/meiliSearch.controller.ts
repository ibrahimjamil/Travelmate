import { Router, Request, Response } from 'express';
import MeiliSearchService from './meiliSearch.service';

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
        minimumQuantity
      } = req.query;
      const filterParams = {
        travelerLocation: JSON.parse(String(travelerLocation)),
        travelerGender: JSON.parse(String(travelerGender)),
        toTravelPlaces: JSON.parse(String(toTravelPlaces)),
        minimumQuantity,
        travelerStatus
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
    this.router.get('/search', this.searchTravelers);
    return this.router
  }
}
