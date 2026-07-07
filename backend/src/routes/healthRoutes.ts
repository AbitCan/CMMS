import { Router } from "express";

export const healthRoutes = Router();

healthRoutes.get("/live", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "cmms-backend",
  });
});

healthRoutes.get("/ready", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "cmms-backend",
  });
});
