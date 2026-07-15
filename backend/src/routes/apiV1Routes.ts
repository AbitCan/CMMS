import { Router } from "express";
import { assetRoutes } from "../modules/assets/asset.routes";
import { sparePartRoutes } from "../modules/spare-parts/sparePart.routes";

export const apiV1Routes = Router();

apiV1Routes.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    apiVersion: "v1",
  });
});

apiV1Routes.use("/assets", assetRoutes);
apiV1Routes.use("/spare-parts", sparePartRoutes);
