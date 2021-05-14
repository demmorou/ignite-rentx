import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email): Promise<User>;
}

export default IUsersRepository;
