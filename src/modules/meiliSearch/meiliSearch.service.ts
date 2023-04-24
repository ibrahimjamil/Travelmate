import * as searchIndex from '../../lib/search/index';

class MeiliSearchService {

  public addRecommendedTravelerIndex = (data: any) => {
    return searchIndex.addOrUpdateMultiple('travelmateRecommenders', [data])
  }

  public updateIndexesIfRequired = () => {
    return searchIndex.updateIndexesIfRequired();
  };
}

export default new MeiliSearchService();
