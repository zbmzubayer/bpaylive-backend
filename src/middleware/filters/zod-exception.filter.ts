import { ApiErrorResponse, ApiStatus } from '@/shared';
import { HttpStatus } from '@/shared/enums';
import { type ZodError } from 'zod';

const zodErrorFilter = (error: ZodError): ApiErrorResponse => {
  const errorResponse: ApiErrorResponse = {
    status: ApiStatus.ERROR,
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Validation error',
    error: {
      // details: error.issues.reduce(
      //   (acc, issue) => `${issue.path.join('.')} - ${issue.message}, ${acc}`,
      //   ''
      // ),
      details: error.issues.map((issue) => ({
        [issue.path.join()]: issue.message,
      })),
    },
  };
  console.error('ZodErrorFilter', errorResponse);
  return errorResponse;
};

export default zodErrorFilter;
