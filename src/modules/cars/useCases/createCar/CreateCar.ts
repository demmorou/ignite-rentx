import { inject, injectable } from 'tsyringe';

import { AppError } from '~shared/errors/AppError';

import { ICreateCarDTO } from '~modules/cars/dtos';
import { Car } from '~modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '~modules/cars/repositories/ICarsRepository';

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
  }: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists');
    }

    const car = await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return car;
  }
}

export { CreateCar };
