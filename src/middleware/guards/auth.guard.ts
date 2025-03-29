import { type NextFunction, type Request, type Response } from 'express';
import { decode, getToken } from 'next-auth/jwt';

import { ENV } from '@/config';
import { ApiError } from '@/shared/api-error';
import { HttpStatus } from '@/shared/enums';
import { prisma } from '@/lib';

export const authGuard = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    let payload = null;
    // Get the token from the request object
    payload = await getToken({ req, secret: ENV.AUTH_SECRET });
    const headerToken = req.headers.authorization?.split(' ')[1];
    // Check if the token is present in the request headers
    if (!payload && headerToken) {
      payload = await decode({ token: headerToken, secret: ENV.AUTH_SECRET });
    }
    if (!payload) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication token is missing or invalid.');
    }
    // Check if the email is present in the payload
    if (!payload.username) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Email not found in the authentication token.');
    }
    // Find the user by email in the database
    const user = await prisma.user.findUnique({ where: { username: payload.username } });
    if (!user) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        'User associated with the authentication token email not found.'
      );
    }
    req.user = user; // Attach user to the request object

    next();
  } catch (error) {
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

    console.error(error);
    next(error);
  }
};
