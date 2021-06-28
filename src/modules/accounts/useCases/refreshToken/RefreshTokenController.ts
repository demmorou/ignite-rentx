import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshToken } from './RefreshToken';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token;

    const refreshToken = container.resolve(RefreshToken);

    const refresh_token = await refreshToken.execute({ token });

    return response.status(201).json({ refresh_token });
  }
}

export { RefreshTokenController };
