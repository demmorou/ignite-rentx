import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { IDateProvider } from '~shared/container/providers/DateProvider/models/IDateProvider';
import { IMailProvider } from '~shared/container/providers/MailProvider/models/IMailProvider';
import { AppError } from '~shared/errors/AppError';

import { IUsersRepository } from '~modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '~modules/accounts/repositories/IUsersToensRepository';

type IRequest = {
  email: string;
};

@injectable()
class SendForgotPasswordMail {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('MailProvider')
    private readonly mailProvider: IMailProvider
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User no found');
    }

    const token = uuid();

    const tokenExpiresAt = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_at: tokenExpiresAt,
    });

    await this.mailProvider.sendMail({
      to: email,
      body: `<div>Aqui vai um token <strong>${token}</strong></div>`,
      subject: 'Recuperacao de senha',
    });
  }
}

export { SendForgotPasswordMail };
