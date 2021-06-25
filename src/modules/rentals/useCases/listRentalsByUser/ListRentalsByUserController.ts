import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsByUser } from './ListRentalsByUser';

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listRentalsByUser = container.resolve(ListRentalsByUser);

    const rentals = await listRentalsByUser.execute({ user_id });

    return response.status(200).json(rentals);
  }
}

export { ListRentalsByUserController };
