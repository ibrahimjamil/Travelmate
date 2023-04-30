import { TravelMatchRepository } from './travelmatch.repository';

class TravelMatchService {
  public travelMatchRepository: TravelMatchRepository;

  constructor() {
    this.travelMatchRepository = new TravelMatchRepository();
  }

  public addUsersMatch = async (id: any, id2: any) => {
    return await this.travelMatchRepository.addUsersMatch(id, id2);
  };

  public getUserMatches = async (id: any) => {
    return await this.travelMatchRepository.getUserMatches(id);
  }
}

export default new TravelMatchService();
