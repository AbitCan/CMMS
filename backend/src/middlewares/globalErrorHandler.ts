import type { ErrorRequestHandler } from "express";
import { env } from "../config/env";
import { AppError } from "../common/errors/AppError";

export const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const isAppError = error instanceof AppError;
  const statusCode = isAppError ? error.statusCode : 500;

  if (env.NODE_ENV === "development") {
    console.error(error);
  }

  const response = {
    status: "error",
    errorCode: isAppError ? error.errorCode : "INTERNAL_SERVER_ERROR",
    message: isAppError ? error.message : "Internal server error",
    details: isAppError ? (error.details ?? null) : null,
  };

  res.status(statusCode).json(response);
};
