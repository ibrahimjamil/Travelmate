import { Model } from 'objection';
import { User } from '../users/user.model';
import { MatchedTravelerType } from './travelmatch.types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TravelMatch extends MatchedTravelerType {}
// eslint-disable-next-line no-redeclare
export class TravelMatch extends Model {
  // Table name is the only required property.
  static tableName = 'matched_traveler';
  
  static relationMappings() {
    return {
        user: {
          relation: Model.HasManyRelation,
          modelClass: User,
          join: {
            from: 'matched_traveler.userId',
            to: 'user.id',
          },
        },
        recommendedTravelers: {
            relation: Model.HasManyRelation,
            modelClass: User,
            join: {
                from: 'matched_traveler.recommendedTravelersId',
                to: 'user.id',
            },
        }
    }
   }
}
