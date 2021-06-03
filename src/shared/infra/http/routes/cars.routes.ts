import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '~config/upload';
import { CreateCarController } from '~modules/cars/useCases/createCar';
import { CreateCarSpecificationsController } from '~modules/cars/useCases/createCarSpecification';
import { ListAvailableCarsController } from '~modules/cars/useCases/listAvailableCars';
import { UploadCarImagesController } from '~modules/cars/useCases/uploadCarImages';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

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

carsRoutes.post(
  '/:car_id/images',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle
);

export { carsRoutes };
