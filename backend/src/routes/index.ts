import type { Express } from "express";
import { apiV1Routes } from "./apiV1Routes";
import { healthRoutes } from "./healthRoutes";

export const registerRoutes = (app: Express): void => {
  app.use("/health", healthRoutes);
  app.use("/api/v1", apiV1Routes);
};
