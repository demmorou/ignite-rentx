import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRental } from './DevolutionRental';

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { rental_id } = request.params;

    const devolutionRental = container.resolve(DevolutionRental);

    const rental = await devolutionRental.execute({
      rental_id,
    });

    return response.status(200).json(rental);
  }
}

export { DevolutionRentalController };
