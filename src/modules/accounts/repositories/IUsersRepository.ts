import { ICreateUserDTO } from '~modules/accounts/dtos';
import { User } from '~modules/accounts/entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email): Promise<User>;
  findById(id): Promise<User>;
}

export { IUsersRepository };
