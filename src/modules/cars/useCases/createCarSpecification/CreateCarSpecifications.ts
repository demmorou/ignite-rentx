import { inject, injectable } from 'tsyringe';

import { AppError } from '~shared/errors/AppError';

import { ICarsRepository } from '~modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '~modules/cars/repositories/ISpecificationsRepository';

type IRequest = {
  car_id: string;
  specifications_id: string[];
};

@injectable()
class CreateCarSpecifications {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car does not exists');
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    car.specifications = specifications;

    await this.carsRepository.save(car);
  }
}

export { CreateCarSpecifications };
