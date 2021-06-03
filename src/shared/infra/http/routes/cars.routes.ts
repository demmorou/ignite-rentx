import { Router } from 'express';

import { CreateCarController } from '~modules/cars/useCases/createCar';
import { CreateCarSpecificationsController } from '~modules/cars/useCases/createCarSpecification';
import { ListAvailableCarsController } from '~modules/cars/useCases/listAvailableCars';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationsController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/:car_id/specifications',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle
);

export { carsRoutes };
