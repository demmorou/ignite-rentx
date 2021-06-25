import { Router } from 'express';

import { CreateRentalController } from '~modules/rentals/useCases/createRental';
import { DevolutionRentalController } from '~modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '~modules/rentals/useCases/listRentalsByUser';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post(
  '/devolution/:rental_id',
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalsRoutes.get(
  '/users',
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
