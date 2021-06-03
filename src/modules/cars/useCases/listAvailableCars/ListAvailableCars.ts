import { inject, injectable } from 'tsyringe';

import { IFindAvailableDTO } from '~modules/cars/dtos/IFindAvailableDTO';
import { Car } from '~modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '~modules/cars/repositories/ICarsRepository';

@injectable()
class ListAvailableCars {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    category_id,
    name,
  }: IFindAvailableDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      brand,
      category_id,
      name,
    });

    return cars;
  }
}

export { ListAvailableCars };
