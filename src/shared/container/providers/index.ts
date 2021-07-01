import { container } from 'tsyringe';

import { mailConfig } from '~config/mail';

import { DayJsProvider } from './DateProvider/implementations/DayJsProvider';
import { IDateProvider } from './DateProvider/models/IDateProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from './MailProvider/models/IMailProvider';

const mailProvider = {
  local: EtherealMailProvider,
};

container.registerSingleton<IDateProvider>('DateProvider', DayJsProvider);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new mailProvider[mailConfig.driver]()
);
