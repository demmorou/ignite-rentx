import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateCarDTO } from '~modules/cars/dtos';

import { CreateCar } from './CreateCar';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      license_plate,
      fine_amount,
      daily_rate,
      brand,
      category_id,
    }: ICreateCarDTO = request.body;

    const createCar = container.resolve(CreateCar);

    const car = await createCar.execute({
      name,
      description,
      license_plate,
      fine_amount,
      daily_rate,
      brand,
      category_id,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
