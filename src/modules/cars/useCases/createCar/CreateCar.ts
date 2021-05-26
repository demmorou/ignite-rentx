import { inject, injectable } from 'tsyringe';

import { ICreateCarDTO } from '~modules/cars/dtos';
import { ICarsRepository } from '~modules/cars/repositories/IcarsRepository';

@injectable()
class CreateCar {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    license_plate,
    fine_amount,
    daily_rate,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<void> {
    await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });
  }
}

export { CreateCar };
