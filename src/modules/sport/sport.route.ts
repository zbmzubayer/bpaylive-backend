import { Router } from 'express';

import validateRequest from '@/middleware/validate-request.middleware';
import { reqParamsSchema } from '@/shared/query-param.validation';

import { sportController } from './sport.controller';
import { upload } from '@/middleware';
import { authGuard } from '@/middleware/guards/auth.guard';

const router: Router = Router();

router.post('/', authGuard(), upload.single('icon'), sportController.create);
router.get('/:id', validateRequest(reqParamsSchema), sportController.findById);
router.get('/', sportController.findAll);
router.patch(
  '/:id',
  authGuard(),
  validateRequest(reqParamsSchema),
  upload.single('icon'),
  sportController.update
);
router.delete('/:id', authGuard(), validateRequest(reqParamsSchema), sportController.remove);

export const sportRouter = router;
