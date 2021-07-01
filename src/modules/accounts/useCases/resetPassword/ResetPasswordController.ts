import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPassword } from './ResetPassword';

type IQuery = {
  token: string;
};

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { newPassword } = request.body;
    const { token } = (request.query as unknown) as IQuery;

    const resetPassword = container.resolve(ResetPassword);

    await resetPassword.execute({
      newPassword,
      token,
    });

    return response.status(204).send();
  }
}

export { ResetPasswordController };
