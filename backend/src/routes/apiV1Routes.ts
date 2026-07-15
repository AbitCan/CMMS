import { Router } from "express";
import { assetRoutes } from "../modules/assets/asset.routes";

export const apiV1Routes = Router();

apiV1Routes.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    apiVersion: "v1",
  });
});

apiV1Routes.use("/assets", assetRoutes);
