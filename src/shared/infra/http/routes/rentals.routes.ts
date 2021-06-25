import { Router } from 'express';

import { CreateRentalController } from '~modules/rentals/useCases/createRental';
import { DevolutionRentalController } from '~modules/rentals/useCases/devolutionRental/DevolutionRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post(
  '/devolution/:rental_id',
  ensureAuthenticated,
  devolutionRentalController.handle
);

export { rentalsRoutes };
