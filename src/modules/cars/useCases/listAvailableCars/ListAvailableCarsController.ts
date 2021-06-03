import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IFindAvailableDTO } from '~modules/cars/dtos/IFindAvailableDTO';

import { ListAvailableCars } from './ListAvailableCars';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name }: IFindAvailableDTO = request.query;

    const listAvailableCars = container.resolve(ListAvailableCars);

    const cars = await listAvailableCars.execute({ brand, category_id, name });

    return response.json(cars);
  }
}

export { ListAvailableCarsController };
