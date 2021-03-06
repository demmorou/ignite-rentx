import { DayJsProvider } from '~shared/container/providers/DateProvider/implementations/DayJsProvider';

import { ICreateUserDTO } from '~modules/accounts/dtos';
import { MemoryUsersRepository } from '~modules/accounts/repositories/memory/MemoryUsersRepository';
import { MemoryUsersTokensRepository } from '~modules/accounts/repositories/memory/MemoryUsersTokensRepository';

import { CreateUserUseCase } from '../createUser';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

describe('AuthenticateUser', () => {
  let usersRepository: MemoryUsersRepository;
  let authenticateUser: AuthenticateUserUseCase;
  let createUser: CreateUserUseCase;
  let usersTokensRepository: MemoryUsersTokensRepository;
  let dateProvider: DayJsProvider;

  beforeEach(() => {
    usersRepository = new MemoryUsersRepository();
    usersTokensRepository = new MemoryUsersTokensRepository();
    dateProvider = new DayJsProvider();
    authenticateUser = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider
    );
    createUser = new CreateUserUseCase(usersRepository);
  });

  it('should be able authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123123',
      email: 'test@test.com',
      name: 'test',
      password: 'test',
    };

    await createUser.execute({ ...user });

    const result = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token', result.token);
    expect(result).toHaveProperty('user');
  });

  it('should not be able to authenticate a nonexistent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'test@test',
        password: 'test',
      })
    ).rejects.toHaveProperty('message', 'E-mail or password invalid!');
  });

  it('should not be able to authenticate with incorect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123123',
      email: 'test@test.com',
      name: 'test',
      password: 'test',
    };

    await createUser.execute({ ...user });

    await expect(
      authenticateUser.execute({
        email: user.email,
        password: 'test123',
      })
    ).rejects.toHaveProperty('message', 'E-mail or password invalid!');
  });
});
