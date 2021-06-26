import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '~shared/container/providers/DateProvider/models/IDateProvider';
import { AppError } from '~shared/errors/AppError';

import { authConfig } from '~config/auth';
import { IUsersRepository } from '~modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '~modules/accounts/repositories/IUsersToensRepository';

type IRequest = {
  email: string;
  password: string;
};

type IResponse = {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
};

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('E-mail or password invalid!', 401);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('E-mail or password invalid!', 401);

    const token = sign({}, authConfig.SECRET_KEY, {
      subject: user.id,
      expiresIn: authConfig.EXPIRES_IN,
    });

    const refresh_token = sign({ email }, authConfig.SECRET_KEY_REFRESH, {
      subject: user.id,
      expiresIn: authConfig.EXPIRES_IN_REFRESH,
    });

    const refreshTokenExpiresAt = this.dateProvider.addDays(
      authConfig.EXPIRES_IN_REFRESH_DAYS
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_at: refreshTokenExpiresAt,
    });

    return {
      user: {
        email,
        name: user.name,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
