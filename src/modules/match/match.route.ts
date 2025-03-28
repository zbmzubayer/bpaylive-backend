import { Router } from 'express';

import validateRequest from '@/middleware/validate-request.middleware';
import { reqParamsSchema } from '@/shared/query-param.validation';

import { authGuard } from '@/middleware/guards/auth.guard';
import { matchController } from './match.controller';
import { upload } from '@/middleware';

const router: Router = Router();

router.post('/', authGuard(), upload.single('thumbnail'), matchController.create);
router.get('/:id', validateRequest(reqParamsSchema), matchController.findById);
router.get('/', matchController.findAll);
router.patch(
  '/:id',
  authGuard(),
  upload.single('thumbnail'),
  validateRequest(reqParamsSchema),
  matchController.update
);
router.delete('/:id', authGuard(), validateRequest(reqParamsSchema), matchController.remove);
router.get('/url/:url', matchController.findByURL);

export const matchRouter = router;
