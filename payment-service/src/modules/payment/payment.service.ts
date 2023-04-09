import { UserRepository } from './payment.repository';
import { UserType } from './payment.types';

class UserService {
  public userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public getOneUser = async (email: string) => {
    return await this.userRepository.getUser(email);
  };

  public addUser = async (userData: Partial<UserType>) => {
    return await this.userRepository.createUser(userData);
  };

  public updateUser = async (id: number, userData: Partial<UserType>) => {
    return await this.userRepository.updateUser({ id, ...userData });
  };
}

export default new UserService();
