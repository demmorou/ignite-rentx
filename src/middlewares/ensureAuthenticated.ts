/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '~config/auth';
import { UsersRepository } from '~modules/accounts/repositories/implementations/UsersRepository';

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
    throw new Error('token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, authConfig.SECRET_KEY, {
      ignoreExpiration: false,
    }) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error('user does not exists');
    }

    _next();
  } catch (error) {
    throw new Error('invalid token');
  }
}
