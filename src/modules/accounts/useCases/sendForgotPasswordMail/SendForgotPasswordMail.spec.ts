import { DayJsProvider } from '~shared/container/providers/DateProvider/implementations/DayJsProvider';
import { MemoryMailProvider } from '~shared/container/providers/MailProvider/memory/MemoryMailProvider';

import { MemoryUsersRepository } from '~modules/accounts/repositories/memory/MemoryUsersRepository';
import { MemoryUsersTokensRepository } from '~modules/accounts/repositories/memory/MemoryUsersTokensRepository';

import { SendForgotPasswordMail } from './SendForgotPasswordMail';

describe('Send Forgot Password Mail', () => {
  let usersRepository: MemoryUsersRepository;
  let usersTokensRepository: MemoryUsersTokensRepository;
  let dateProvider: DayJsProvider;
  let mailProvider: MemoryMailProvider;
  let sendForgotPassword: SendForgotPasswordMail;

  beforeEach(() => {
    usersRepository = new MemoryUsersRepository();
    usersTokensRepository = new MemoryUsersTokensRepository();
    dateProvider = new DayJsProvider();
    mailProvider = new MemoryMailProvider();
    sendForgotPassword = new SendForgotPasswordMail(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it('should be able send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    const email = 'deusimar@dev.com.br';

    await usersRepository.create({
      driver_license: '123123',
      email,
      name: 'Deusimar',
      password: '123123',
    });

    await sendForgotPassword.execute({ email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able send an email if user does not exists', async () => {
    await expect(
      sendForgotPassword.execute({ email: 'deusimar@dev.com' })
    ).rejects.toHaveProperty('message', 'User no found');
  });
});
