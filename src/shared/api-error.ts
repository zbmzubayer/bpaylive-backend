export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string | undefined,
    public stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export enum ApiStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export type ApiResponse<T> = {
  status?: typeof ApiStatus.SUCCESS;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
};

export type ErrorType = {
  details?: string | string[] | object;
};

export type ApiErrorResponse = {
  status: typeof ApiStatus.ERROR;
  statusCode: number;
  message?: string;
  timestamp?: string;
  path?: string;
  error: ErrorType;
};
