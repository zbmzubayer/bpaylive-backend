import { type NextFunction, type Request, type Response } from 'express';
import { ApiError } from '@/shared';
import { ENV } from '@/config';

export const roleGuard =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get the user from the request object
      const authUser = req.user;
      // check if user exists
      if (!authUser) {
        throw new ApiError(401, 'Unauthorized');
      }
      // check if user has the required role
      if (roles.length && !roles.includes(authUser.role)) {
        throw new ApiError(403, 'Forbidden');
      }
      next();
    } catch (err) {
      const nextAuthCookieName =
        ENV.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token';
      res.cookie(nextAuthCookieName, '', {
        maxAge: -1,
        httpOnly: true,
        secure: ENV.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      console.error(err);
      next(err);
    }
  };
