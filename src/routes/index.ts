import { advertisementRouter } from '@/modules/advertisement/advertisement.route';
import { authRouter } from '@/modules/auth/auth.route';
import { channelRouter } from '@/modules/channel/channel.route';
import { matchRouter } from '@/modules/match/match.route';
import { sportRouter } from '@/modules/sport/sport.route';
import { userRouter } from '@/modules/user/user.route';
import { Router } from 'express';

type ModuleRoute = {
  path: string;
  route: Router;
};

const router: Router = Router();

const moduleRoutes: ModuleRoute[] = [
  { path: '/auth', route: authRouter },
  { path: '/user', route: userRouter },
  { path: '/sport', route: sportRouter },
  { path: '/channel', route: channelRouter },
  { path: '/match', route: matchRouter },
  { path: '/advertisement', route: advertisementRouter },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
