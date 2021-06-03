import { NextFunction, Request, Response } from 'express';

import { AppError } from '~shared/errors/AppError';

import { UsersRepository } from '~modules/accounts/infra/typeorm/repositories/UsersRepository';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user || !user.is_admin) {
    throw new AppError('Only admin can access this resource', 401);
  }

  next();
}
