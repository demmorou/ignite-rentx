import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecifications } from '.';

class CreateCarSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecifications = container.resolve(CreateCarSpecifications);

    await createCarSpecifications.execute({ car_id, specifications_id });

    return response.status(201).send();
  }
}

export { CreateCarSpecificationsController };
