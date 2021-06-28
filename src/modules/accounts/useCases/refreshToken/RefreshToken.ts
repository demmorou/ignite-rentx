import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '~shared/container/providers/DateProvider/models/IDateProvider';
import { AppError } from '~shared/errors/AppError';

import { authConfig } from '~config/auth';
import { IUsersTokensRepository } from '~modules/accounts/repositories/IUsersToensRepository';

type IRequest = {
  token: string;
};

type IPayload = {
  sub: string;
  email: string;
};

@injectable()
class RefreshToken {
  constructor(
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute({ token }: IRequest): Promise<string> {
    try {
      const payload = verify(token, authConfig.SECRET_KEY_REFRESH) as IPayload;

      const user_id = payload.sub;

      const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
        { refresh_token: token, user_id }
      );

      if (!userToken) {
        throw new AppError('Refresh token error!');
      }

      await this.usersTokensRepository.deleteById(userToken.id);

      const { email, sub } = payload;

      const refresh_token = sign({ email }, authConfig.SECRET_KEY_REFRESH, {
        subject: sub,
        expiresIn: authConfig.EXPIRES_IN_REFRESH,
      });

      const refreshTokenExpiresAt = this.dateProvider.addDays(
        authConfig.EXPIRES_IN_REFRESH_DAYS
      );

      await this.usersTokensRepository.create({
        user_id: sub,
        refresh_token,
        expires_at: refreshTokenExpiresAt,
      });

      return refresh_token;
    } catch (error) {
      throw new AppError('Refresh token error!');
    }
  }
}

export { RefreshToken };
