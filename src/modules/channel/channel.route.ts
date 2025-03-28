import { Router } from 'express';

import validateRequest from '@/middleware/validate-request.middleware';
import { reqParamsSchema } from '@/shared/query-param.validation';
import { channelController } from './channel.controller';
import { upload } from '@/middleware';
import { authGuard } from '@/middleware/guards/auth.guard';

const router: Router = Router();

router.post('/', authGuard(), upload.single('icon'), channelController.create);
router.get('/:id', validateRequest(reqParamsSchema), channelController.findById);
router.get('/', channelController.findAll);
router.patch(
  '/:id',
  authGuard(),
  upload.single('icon'),
  validateRequest(reqParamsSchema),
  channelController.update
);
router.delete('/:id', authGuard(), validateRequest(reqParamsSchema), channelController.remove);

export const channelRouter = router;
