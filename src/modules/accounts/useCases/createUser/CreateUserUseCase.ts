import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '~modules/accounts/dtos';
import { IUsersRepository } from '~modules/accounts/repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({
    password,
    name,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) throw new Error('User already exists');

    const passwordHash = await hash(password, 10);

    await this.usersRepository.create({
      password: passwordHash,
      name,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
