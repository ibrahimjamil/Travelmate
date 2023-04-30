import { TravelMatch } from './travelmatch.model';

export class TravelMatchRepository {
  async addUsersMatch(id: any, id2: any) {
    console.log(id, id2)
    return await TravelMatch.query().insert({
        userId: id,
        recommendedTravelersId: id2
      });
  }

  async getUserMatches(email: string) {
    return await TravelMatch.query().findOne({
      email,
    });
  }
}
