import { ICreateRentalDTO } from '~modules/rentals/dtos';
import { Rental } from '~modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class MemoryRentalsRepository implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      fk_car_id: car_id,
      fk_user_id: user_id,
      expected_return_date,
      start_date: new Date(),
      end_date: null,
      total: 0,
    });

    this.rentals.push(rental);

    return rental;
  }

  async save(rental: Rental): Promise<void> {
    const rentalIndex = this.rentals.findIndex(({ id }) => id === rental.id);

    this.rentals[rentalIndex] = rental;
  }

  async findByCarId(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.fk_car_id === car_id && rental.end_date === null
    );

    return rental;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.fk_user_id === user_id && rental.end_date === null
    );

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.id === id && rental.end_date === null
    );

    return rental;
  }
}

export { MemoryRentalsRepository };
