import type { ErrorRequestHandler } from "express";
import { env } from "../config/env";
import { AppError } from "../common/errors/AppError";

export const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = error instanceof AppError ? error.statusCode : 500;

  const response = {
    status: "error",
    message: error instanceof AppError ? error.message : "Internal server error",
    ...(env.NODE_ENV === "development" && {
      stack: error instanceof Error ? error.stack : undefined,
    }),
  };

  res.status(statusCode).json(response);
};