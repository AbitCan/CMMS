import type { RequestHandler } from "express";
import { AppError } from "../common/errors/AppError";

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(
    new AppError(`Route not found: ${req.method} ${req.originalUrl}`, {
      statusCode: 404,
      errorCode: "ROUTE_NOT_FOUND",
      details: {
        method: req.method,
        path: req.originalUrl,
      },
    }),
  );
};
