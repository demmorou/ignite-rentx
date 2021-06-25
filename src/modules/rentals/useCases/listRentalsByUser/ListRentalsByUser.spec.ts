import dayjs from 'dayjs';

import { DayJsProvider } from '~shared/container/providers/DateProvider/implementations/DayJsProvider';
import { IDateProvider } from '~shared/container/providers/DateProvider/models/IDateProvider';

import { MemoryUsersRepository } from '~modules/accounts/repositories/memory/MemoryUsersRepository';
import { MemoryCarsRepository } from '~modules/cars/repositories/in-memory/MemoryCarsRepository';
import { MemoryRentalsRepository } from '~modules/rentals/repositories/memory/MemoryRentalsRepository';

import { CreateRental } from '../createRental';
import { ListRentalsByUser } from './ListRentalsByUser';

describe('List Rentals By User', () => {
  let listRentals: ListRentalsByUser;
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
    listRentals = new ListRentalsByUser(rentalsRepository);

    expected_return_date = dayjs(new Date()).add(2, 'days').toDate();
  });

  it('should be able list all rentals by an user', async () => {
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

    const rentals = await listRentals.execute({ user_id: user.id });

    expect(rentals).toEqual([rental]);
    expect(rentals.length).toBe(1);
  });
});
