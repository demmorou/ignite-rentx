/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { AppError } from '~errors/AppError';

export function errorInterceptor(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response
    .status(500)
    .json({ message: `Internal server error - ${error.message}` });
}
