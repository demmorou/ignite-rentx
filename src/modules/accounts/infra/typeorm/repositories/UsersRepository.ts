import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '~modules/accounts/dtos';
import { User } from '~modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '~modules/accounts/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      driver_license,
      email,
      name,
      password,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }
}

export { UsersRepository };
