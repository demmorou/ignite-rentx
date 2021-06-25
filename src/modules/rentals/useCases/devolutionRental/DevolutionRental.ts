import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '~shared/container/providers/DateProvider/models/IDateProvider';
import { AppError } from '~shared/errors/AppError';

import { ICarsRepository } from '~modules/cars/repositories/ICarsRepository';
import { Rental } from '~modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '~modules/rentals/repositories/IRentalsRepository';

type IRequest = {
  rental_id: string;
};

@injectable()
class DevolutionRental {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('DateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute({ rental_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id);

    if (!rental) throw new AppError('Rental does not exists');

    const car = await this.carsRepository.findById(rental.fk_car_id);

    const minimum_daily = 1;

    const dateNow = this.dateProvider.now();

    let daily = this.dateProvider.diffInDays(
      rental.start_date,
      this.dateProvider.now()
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.diffHours(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay < 24) {
      const calculateFine = delay * car.fine_amount;

      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.now();
    rental.total = total;

    await this.rentalsRepository.save(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRental };
