import { Router } from 'express';
import multer from 'multer';

import { ensureAuthenticated } from '~shared/infra/http/middlewares/ensureAuthenticated';

import uploadConfig from '~config/upload';
import { CreateUserController } from '~modules/accounts/useCases/createUser';
import { UpdateUserAvatarController } from '~modules/accounts/useCases/updateUserAvatar';

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post('/', createUserController.handle);

userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export { userRoutes };
