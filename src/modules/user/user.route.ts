import { Router } from 'express';

import validateRequest from '@/middleware/validate-request.middleware';
import { reqParamsSchema } from '@/shared/query-param.validation';

import { userController } from './user.controller';
import { userZodSchema } from './user.dto';
import { authGuard } from '@/middleware/guards/auth.guard';
import { roleGuard } from '@/middleware/guards/role.guard';
import { USER_ROLE } from './user.constant';

const router: Router = Router();

router.use(authGuard());
router.use(roleGuard(USER_ROLE.ADMIN));

router.post('/', validateRequest(userZodSchema.create), userController.create);
router.get('/:id', validateRequest(reqParamsSchema), userController.findById);
router.get('/', userController.findAll);
router.patch(
  '/:id',
  validateRequest(reqParamsSchema),
  validateRequest(userZodSchema.update),
  userController.update
);
router.delete('/:id', validateRequest(reqParamsSchema), userController.remove);

export const userRouter = router;
