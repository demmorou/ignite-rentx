import { MemoryCarsRepository } from '~modules/cars/repositories/in-memory/MemoryCarsRepository';

import { ListAvailableCars } from './ListAvailableCars';

describe('List Cars', () => {
  let listCars: ListAvailableCars;
  let carsRepository: MemoryCarsRepository;

  beforeEach(() => {
    carsRepository = new MemoryCarsRepository();
    listCars = new ListAvailableCars(carsRepository);
  });

  it('should be able list all available cars', async () => {
    const car1 = await carsRepository.create({
      name: 'Car',
      description: 'Car 1',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'CDAS-0876',
      category_id: 'category',
    });

    const car2 = await carsRepository.create({
      name: 'Car',
      description: 'Car 2',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'ABCD-1234',
      category_id: 'category',
    });

    const cars = await listCars.execute({});

    expect(cars.length).toBe(2);
    expect(cars).toEqual([car1, car2]);
  });

  it('should be able list all available cars by name', async () => {
    const car1 = await carsRepository.create({
      name: 'siena',
      description: 'Car 1',
      brand: 'Marca',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'CDAS-0876',
      category_id: 'category',
    });

    const car2 = await carsRepository.create({
      name: 'siena',
      description: 'Car 2',
      brand: 'Marca',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'ABCD-1234',
      category_id: 'category',
    });

    await carsRepository.create({
      name: 'Car3',
      description: 'Car 2',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'ABCD-1234',
      category_id: 'category',
    });

    const cars = await listCars.execute({ name: 'siena' });

    expect(cars).toEqual([car1, car2]);
  });

  it('should be able list all available cars by brand', async () => {
    const car1 = await carsRepository.create({
      name: 'Car1',
      description: 'Car 1',
      brand: 'Marca',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'CDAS-0876',
      category_id: 'category',
    });

    const car2 = await carsRepository.create({
      name: 'Car2',
      description: 'Car 2',
      brand: 'Marca',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'ABCD-1234',
      category_id: 'category',
    });

    await carsRepository.create({
      name: 'Car3',
      description: 'Car 2',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'ABCD-1234',
      category_id: 'category',
    });

    const cars = await listCars.execute({ brand: 'Marca' });

    expect(cars).toEqual([car1, car2]);
  });

  it('should be able list all available cars by category id', async () => {
    const car1 = await carsRepository.create({
      name: 'Car1',
      description: 'Car 1',
      brand: 'Marca',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'CDAS-0876',
      category_id: 'category_1',
    });

    await carsRepository.create({
      name: 'Car2',
      description: 'Car 2',
      brand: 'Marca',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'ABCD-1234',
      category_id: 'category_2',
    });

    const car3 = await carsRepository.create({
      name: 'Car3',
      description: 'Car 2',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'ABCD-1234',
      category_id: 'category_1',
    });

    const cars = await listCars.execute({ category_id: 'category_1' });

    expect(cars).toEqual([car1, car3]);
  });
});
