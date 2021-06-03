import { ICreateSpecificationDTO } from '~modules/cars/dtos';
import { MemoryCarsRepository } from '~modules/cars/repositories/in-memory/MemoryCarsRepository';
import { MemorySpecificationsRepository } from '~modules/cars/repositories/in-memory/MemorySpecificationsRepository';

import { CreateCarSpecifications } from './CreateCarSpecifications';

describe('Create Car Specification', () => {
  let createCarSpecification: CreateCarSpecifications;
  let carsRepository: MemoryCarsRepository;
  let specificationsRepository: MemorySpecificationsRepository;

  beforeEach(() => {
    carsRepository = new MemoryCarsRepository();
    specificationsRepository = new MemorySpecificationsRepository();
    createCarSpecification = new CreateCarSpecifications(
      carsRepository,
      specificationsRepository
    );
  });

  it('should be able register a new car specification to the car', async () => {
    const specificationDTO: ICreateSpecificationDTO = {
      name: 'spec 1',
      description: 'description spec 1',
    };

    await specificationsRepository.create({ ...specificationDTO });

    const specification = await specificationsRepository.findByName(
      specificationDTO.name
    );

    const car = await carsRepository.create({
      name: 'Car Available',
      description: 'Car 1',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'DEUS-0000',
      category_id: 'category',
    });

    const specifications_id = [specification.id];

    await createCarSpecification.execute({ car_id: car.id, specifications_id });

    const carWithSpecifications = await carsRepository.findById(car.id);

    expect(carWithSpecifications.specifications).toEqual([specification]);
  });

  it('should not be able register a new car specification to a nonexistent car', async () => {
    const car_id = '1234';
    const specifications_id = ['1234'];

    await expect(
      createCarSpecification.execute({ car_id, specifications_id })
    ).rejects.toHaveProperty('message', 'Car does not exists');
  });
});
