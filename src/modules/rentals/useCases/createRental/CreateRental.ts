import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '~shared/container/providers/DateProvider/models/IDateProvider';
import { AppError } from '~shared/errors/AppError';

import { ICreateRentalDTO } from '~modules/rentals/dtos';
import { Rental } from '~modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '~modules/rentals/repositories/IRentalsRepository';

@injectable()
class CreateRental {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider
  ) {}
  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumHour = 24;

    const carUnavailable = await this.rentalsRepository.findByCarId(car_id);

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUserId(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError('There is a rental open for this user');
    }

    const compare = this.dateProvider.diffHours(
      this.dateProvider.now(),
      expected_return_date
    );

    if (compare < minimumHour) {
      throw new AppError('Inalid return expected date');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    return rental;
  }
}

export { CreateRental };
