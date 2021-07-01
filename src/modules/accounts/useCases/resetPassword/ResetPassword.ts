import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '~shared/container/providers/DateProvider/models/IDateProvider';
import { AppError } from '~shared/errors/AppError';

import { IUsersRepository } from '~modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '~modules/accounts/repositories/IUsersToensRepository';

type IRequest = {
  token: string;
  newPassword: string;
};

@injectable()
class ResetPassword {
  constructor(
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute({ newPassword, token }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError('User token does not exsits');
    }

    if (
      this.dateProvider.compareIsBefore(
        userToken.expires_at,
        this.dateProvider.now()
      )
    ) {
      throw new AppError('Token expired');
    }

    const user = await this.usersRepository.findById(userToken.fk_user_id);

    user.password = await hash(newPassword, 10);

    await this.usersRepository.save(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPassword };
