import { TravelMatch } from './travelmatch.model';

export class TravelMatchRepository {
  async addUsersMatch(id: any, id2: any) {
    return await TravelMatch
        .query()
        .insert({
          userId: id,
          recommendedTravelersId: id2
        })
  }

  async getUserMatches(id: any) {
    return await TravelMatch.query().where('userId', id).withGraphFetched('recommendedTravelers');
  }
}
