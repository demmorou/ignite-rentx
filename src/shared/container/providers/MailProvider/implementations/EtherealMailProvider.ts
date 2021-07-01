import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        this.client = transporter;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async sendMail({
    variables,
    path,
    subject,
    to,
  }: ISendMailDTO): Promise<void> {
    const templateFile = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFile);

    const templateHtml = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'noreply@rentx.com.br',
      subject,
      html: templateHtml,
    });

    console.log('Message sent to: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
