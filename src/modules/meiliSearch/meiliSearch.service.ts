import * as searchIndex from '../../lib/search/index';

class MeiliSearchService {


  public searchRecommendedTravelers = async (
    query: string,
    filterParams: any,
    limit: number,
    offset: number
  ) => {
    let filtersIndex = 0;
    const filter: any = [];
    const calculatedOffset = limit * (offset - 1);

    if (filterParams.travelerLocation?.length) {
      filter.push([]);
      filterParams.travelerLocation?.forEach((s: any) => {
        filter[filtersIndex].push(`location = '${s}'`);
      });
      filtersIndex += 1;
    }

    if (filterParams.travelerGender?.length) {
      filter.push([]);
      filterParams.travelerGender?.forEach((s: any) => {
        filter[filtersIndex].push(`gender = '${s}'`);
      });
      filtersIndex += 1;
    }
    if (filterParams?.toTravelPlaces) {
      filter.push([]);
      filterParams.toTravelPlaces?.forEach((s: any) => {
        filter[filtersIndex].push(`expectedVisitingPlaces = '${s}'`);
      });
      filtersIndex += 1;
    }
    if (filterParams?.travelerStatus) {
      filter.push([]);
      filter[filtersIndex].push(`status = '${(filterParams.travelerStatus)}'`);
      filtersIndex += 1;
    }
    
    return await searchIndex.search('travelmateRecommenders', query, filter , limit, calculatedOffset);
  }

  public addRecommendedTravelerIndex = (data: any) => {
    return searchIndex.addOrUpdateMultiple('travelmateRecommenders', [data])
  }

  public updateIndexesIfRequired = () => {
    return searchIndex.updateIndexesIfRequired();
  };
}

export default new MeiliSearchService();
