/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '~shared/errors/AppError';

import { authConfig } from '~config/auth';
import { UsersTokensRepository } from '~modules/accounts/infra/typeorm/repositories/UsersTokensRepository';

type IPayload = {
  sub: string;
};

export async function ensureAuthenticated(
  request: Request,
  _response: Response,
  _next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, authConfig.SECRET_KEY_REFRESH, {
      ignoreExpiration: false,
    }) as IPayload;

    const usersTokensRepository = new UsersTokensRepository();

    const user = await usersTokensRepository.findByUserIdAndRefreshToken({
      refresh_token: token,
      user_id,
    });

    if (!user) {
      throw new AppError('user does not exists', 401);
    }

    request.user = {
      id: user_id,
    };

    _next();
  } catch (error) {
    throw new AppError('invalid token', 401);
  }
}
