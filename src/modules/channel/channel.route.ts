import { Router } from 'express';

import validateRequest from '@/middleware/validate-request.middleware';
import { reqParamsSchema } from '@/shared/query-param.validation';
import { channelController } from './channel.controller';
import { upload } from '@/middleware';
import { authGuard } from '@/middleware/guards/auth.guard';
import { roleGuard } from '@/middleware/guards/role.guard';
import { USER_ROLE } from '../user/user.constant';

const router: Router = Router();

router.post(
  '/',
  authGuard(),
  roleGuard(USER_ROLE.ADMIN),
  upload.single('icon'),
  channelController.create
);
router.get('/:id', validateRequest(reqParamsSchema), channelController.findById);
router.get('/', channelController.findAll);
router.patch(
  '/:id',
  authGuard(),
  roleGuard(USER_ROLE.ADMIN),
  upload.single('icon'),
  validateRequest(reqParamsSchema),
  channelController.update
);
router.delete(
  '/:id',
  authGuard(),
  roleGuard(USER_ROLE.ADMIN),
  validateRequest(reqParamsSchema),
  channelController.remove
);

export const channelRouter = router;
