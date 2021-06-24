import dayjs from 'dayjs';

import { DayJsProvider } from '~shared/container/providers/DateProvider/implementations/DayJsProvider';
import { IDateProvider } from '~shared/container/providers/DateProvider/models/IDateProvider';

import { MemoryUsersRepository } from '~modules/accounts/repositories/memory/MemoryUsersRepository';
import { MemoryCarsRepository } from '~modules/cars/repositories/in-memory/MemoryCarsRepository';
import { MemoryRentalsRepository } from '~modules/rentals/repositories/memory/MemoryRentalsRepository';

import { CreateRental } from './CreateRental';

describe('Create Rental', () => {
  let createRental: CreateRental;
  let rentalsRepository: MemoryRentalsRepository;
  let usersRepository: MemoryUsersRepository;
  let carsRepository: MemoryCarsRepository;
  let expected_return_date: Date;
  let dateProvider: IDateProvider;

  beforeEach(() => {
    usersRepository = new MemoryUsersRepository();
    carsRepository = new MemoryCarsRepository();
    rentalsRepository = new MemoryRentalsRepository();
    dateProvider = new DayJsProvider();
    createRental = new CreateRental(
      rentalsRepository,
      dateProvider,
      carsRepository
    );
    expected_return_date = dayjs(new Date()).add(2, 'days').toDate();
  });

  it('should be able register a new rental', async () => {
    await usersRepository.create({
      driver_license: '123123',
      email: 'user@rentx.com.br',
      name: 'Rentx',
      password: 'rentx123',
    });

    const user = await usersRepository.findByEmail('user@rentx.com.br');

    const car = await carsRepository.create({
      name: 'Car Available',
      description: 'Car 1',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'DEUS-0000',
      category_id: 'category',
    });

    const rental = await createRental.execute({
      car_id: car.id,
      expected_return_date,
      user_id: user.id,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able register a new rental with an user with same rental opened', async () => {
    await usersRepository.create({
      driver_license: '123123',
      email: 'user@rentx.com.br',
      name: 'Rentx',
      password: 'rentx123',
    });

    const user = await usersRepository.findByEmail('user@rentx.com.br');

    const car = await carsRepository.create({
      name: 'Car Available',
      description: 'Car 1',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'DEUS-0000',
      category_id: 'category',
    });

    const car2 = await carsRepository.create({
      name: 'Car Available',
      description: 'Car 1',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'DEUS-0000',
      category_id: 'category',
    });

    await createRental.execute({
      car_id: car.id,
      expected_return_date,
      user_id: user.id,
    });

    await expect(
      createRental.execute({
        car_id: car2.id,
        expected_return_date,
        user_id: user.id,
      })
    ).rejects.toHaveProperty('message', 'There is a rental open for this user');
  });

  it('should not be able register a new rental with a car in another rental opened', async () => {
    await usersRepository.create({
      driver_license: '123123',
      email: 'user@rentx.com.br',
      name: 'Rentx',
      password: 'rentx123',
    });

    const user = await usersRepository.findByEmail('user@rentx.com.br');

    await usersRepository.create({
      driver_license: '123123',
      email: 'user2@rentx.com.br',
      name: 'Rentx2',
      password: 'rentx123',
    });

    const user2 = await usersRepository.findByEmail('user2@rentx.com.br');

    const car = await carsRepository.create({
      name: 'Car Available',
      description: 'Car 1',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'DEUS-0000',
      category_id: 'category',
    });

    await createRental.execute({
      car_id: car.id,
      expected_return_date,
      user_id: user.id,
    });

    await expect(
      createRental.execute({
        car_id: car.id,
        expected_return_date,
        user_id: user2.id,
      })
    ).rejects.toHaveProperty('message', 'Car is unavailable');
  });

  it('should not be able register a new rental with return date least than 24 hours', async () => {
    await usersRepository.create({
      driver_license: '123123',
      email: 'user@rentx.com.br',
      name: 'Rentx',
      password: 'rentx123',
    });

    const user = await usersRepository.findByEmail('user@rentx.com.br');

    const car = await carsRepository.create({
      name: 'Car Available',
      description: 'Car 1',
      brand: 'Brand',
      daily_rate: 100,
      fine_amount: 19,
      license_plate: 'DEUS-0000',
      category_id: 'category',
    });

    await expect(
      createRental.execute({
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
        user_id: user.id,
      })
    ).rejects.toHaveProperty('message', 'Inalid return expected date');
  });
});
