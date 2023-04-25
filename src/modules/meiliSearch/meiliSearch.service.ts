import * as searchIndex from '../../lib/search/index';

class MeiliSearchService {


  public searchRecommendedTravelers = async (
    query: string,
    filterParams: any,
    limit: number,
    offset: number
  ) => {
    const calculatedOffset = limit * (offset - 1);
    return await searchIndex.search('travelmateRecommenders', query, [] , limit, calculatedOffset);
  }

  public addRecommendedTravelerIndex = (data: any) => {
    return searchIndex.addOrUpdateMultiple('travelmateRecommenders', [data])
  }

  public updateIndexesIfRequired = () => {
    return searchIndex.updateIndexesIfRequired();
  };
}

export default new MeiliSearchService();
