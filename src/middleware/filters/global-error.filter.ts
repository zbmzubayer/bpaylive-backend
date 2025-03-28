/* eslint-disable @typescript-eslint/no-unused-vars */
import { type ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { ENV } from '@/config';
import zodErrorFilter from '@/middleware/filters/zod-exception.filter';
import { ApiError, ApiErrorResponse, ApiStatus } from '@/shared/api-error';
import { HttpStatus } from '@/shared/enums';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const globalErrorFilter: ErrorRequestHandler = (err, req, res, next) => {
  const errorResponse: ApiErrorResponse = {
    status: ApiStatus.ERROR,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong!',
    path: req.url,
    timestamp: new Date().toISOString(),
    error: {},
  };

  if (err instanceof ZodError) {
    const { error, statusCode, message } = zodErrorFilter(err);
    errorResponse.statusCode = statusCode;
    errorResponse.message = message;
    errorResponse.error.details = error.details;
  } else if (err instanceof ApiError) {
    errorResponse.statusCode = err.statusCode;
    errorResponse.message = err.message;
    errorResponse.error.details = err?.message ? [{ path: '', message: err?.message }] : [];
  } else if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
    errorResponse.statusCode = HttpStatus.NOT_FOUND;
    errorResponse.message = `${err.meta?.modelName} not found`;
    errorResponse.error.details = [
      {
        path: '',
        message: 'The requested resource was not found.',
      },
    ];
  } else if (err instanceof Error) {
    errorResponse.message = err?.message;
    errorResponse.error.details = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }
  res.status(errorResponse.statusCode).json({
    ...errorResponse,
    stack: ENV.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default globalErrorFilter;
