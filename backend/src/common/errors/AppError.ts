type AppErrorOptions = {
  statusCode?: number;
  errorCode?: string;
  isOperational?: boolean;
  details?: unknown;
};

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(message: string, options: AppErrorOptions = {}) {
    super(message);

    this.statusCode = options.statusCode ?? 500;
    this.errorCode = options.errorCode ?? "INTERNAL_SERVER_ERROR";
    this.isOperational = options.isOperational ?? true;
    this.details = options.details;

    Error.captureStackTrace(this, this.constructor);
  }
}
