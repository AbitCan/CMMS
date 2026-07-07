import { Router } from "express";

export const apiV1Routes = Router();

apiV1Routes.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    apiVersion: "v1",
  });
});
