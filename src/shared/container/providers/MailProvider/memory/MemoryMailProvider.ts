import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

class MemoryMailProvider implements IMailProvider {
  async sendMail({
    path,
    subject,
    to,
    variables,
  }: ISendMailDTO): Promise<void> {
    console.log({ path, subject, to, variables });
  }
}

export { MemoryMailProvider };
