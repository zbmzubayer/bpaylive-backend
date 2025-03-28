import { Router } from 'express';

import { authGuard } from '@/middleware/guards/auth.guard';
import { upload } from '@/middleware';
import { advertisementController } from './advertisement.controller';

const router: Router = Router();

router.get('/', advertisementController.find);

router.use(authGuard());

router.patch(
  '/carousel',
  upload.fields([
    { name: 'carouselBanner1', maxCount: 1 },
    { name: 'carouselBanner2', maxCount: 1 },
    { name: 'carouselBanner3', maxCount: 1 },
    { name: 'carouselBanner4', maxCount: 1 },
    { name: 'carouselBanner5', maxCount: 1 },
  ]),
  advertisementController.upsertCarousel
);
router.patch(
  '/popup-banner',
  upload.single('popupBanner'),
  advertisementController.upsertPopupBanner
);
router.patch(
  '/stream-banner',
  upload.single('streamBanner'),
  advertisementController.upsertStreamingBanner
);

export const advertisementRouter = router;
