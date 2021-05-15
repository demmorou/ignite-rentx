import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '~config/auth';
import { AppError } from '~errors/AppError';
import { IUsersRepository } from '~modules/accounts/repositories/IUsersRepository';

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
};

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
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

    return {
      user: {
        email,
        name: user.name,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
