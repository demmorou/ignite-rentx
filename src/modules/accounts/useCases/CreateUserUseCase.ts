import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';

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
    const userAlreadyExists = this.usersRepository.findByEmail(email);

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

export default CreateUserUseCase;
