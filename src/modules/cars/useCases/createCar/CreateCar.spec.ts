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

  it('should be able register a new car', async () => {
    const carDTO: ICreateCarDTO = {
      name: 'Car',
      description: 'Car 1',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'License',
      category_id: 'category',
    };

    const car = await createCar.execute(carDTO);

    expect(car.license_plate).toBe(carDTO.license_plate);
    expect(car).toHaveProperty('id');
  });

  it('should not be able register a car with already existent license plate', async () => {
    const car1: ICreateCarDTO = {
      name: 'Car',
      description: 'Car 1',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'License',
      category_id: 'category',
    };

    const car2: ICreateCarDTO = {
      name: 'Car',
      description: 'Car 1',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'License',
      category_id: 'category',
    };

    await createCar.execute(car1);

    await expect(createCar.execute(car2)).rejects.toHaveProperty(
      'message',
      'Car already exists'
    );
  });

  it('should be able register a car with available true by default', async () => {
    const carDTO: ICreateCarDTO = {
      name: 'Car Available',
      description: 'Car 1',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'DEUS-0000',
      category_id: 'category',
    };

    const car = await createCar.execute(carDTO);

    expect(car.available).toBe(true);
  });
});
