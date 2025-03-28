import { type NextFunction, type Request, type Response } from 'express';

export default function httpLoggerMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { ip, method, originalUrl } = request;
  const userAgent = request.get('user-agent') || '';

  response.on('close', () => {
    const { statusCode } = response;
    const contentLength = response.get('content-length');
    console.log(
      `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      'HTTP'
    );
  });
  next();
}
