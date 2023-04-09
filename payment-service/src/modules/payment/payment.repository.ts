import { User } from './payment.model';
import { UserType } from './payment.types';

export class UserRepository {
  async getAllUsers() {
    return await User.query();
  }

  async getUser(email: string) {
    return await User.query().findOne({
      email,
    });
  }

  async createUser(userData: Partial<UserType>) {
    return await User.query().insert(userData);
  }

  async updateUser(userData: any) {
    return await User.query().findById(userData.id).patch(userData);
  }
}
