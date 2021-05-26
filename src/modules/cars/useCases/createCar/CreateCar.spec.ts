import { ICreateCarDTO } from '~modules/cars/dtos';
import { MemoryCarsRepository } from '~modules/cars/repositories/in-memory/MemoryCarsRepository';

import { CreateCar } from './CreateCar';

describe('Create Car', () => {
  let createCar: CreateCar;
  let carsRepository: MemoryCarsRepository;

  beforeEach(() => {
    carsRepository = new MemoryCarsRepository();
    createCar = new CreateCar(carsRepository);
  });

  it('should be able create a new car', async () => {
    const car: ICreateCarDTO = {
      name: 'Car',
      description: 'Car 1',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'License',
      category_id: 'category',
    };

    await createCar.execute(car);
  });
});
