import { Router, Request, Response } from 'express';
import MeiliSearchService from './meiliSearch.service';

export class MeiliSearchController {
  public router: Router;
  public meiliSearchService = MeiliSearchService;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public searchProducts = async (req: Request, res: Response) => {
    try {
      // const {
      //   query, pageNo, productSize, productBrand, productColor,
      //   productCategory, minimumQuantity, pageSize, ageFilter,
      //   genderFilter, materialFilter, showStyleIndexSwitchButton,
      // } = req.query;
      // const filterParams = {
      //   productSize: JSON.parse(String(productSize)),
      //   productBrand: JSON.parse(String(productBrand)),
      //   productColor: JSON.parse(String(productColor)),
      //   productCategory: JSON.parse(String(productCategory)),
      //   ageFilter: JSON.parse(String(ageFilter)),
      //   genderFilter: JSON.parse(String(genderFilter)),
      //   materialFilter: JSON.parse(String(materialFilter)),
      //   minimumQuantity,
      //   showStyleIndexSwitchButton: JSON.parse(String(showStyleIndexSwitchButton)),
      // }
      // const searchResult = await this.meiliSearchService
      //   .searchProductVariants(String(query), filterParams, Number(pageSize), Number(pageNo));
      // res.status(200).send(searchResult);
    } catch (error: any) {
      res.status(500).send({
        error: true,
        message: error.message,
      })
    }
  }

  public routes() {
    this.router.get('/search', this.searchProducts);
    return this.router
  }
}
