import { Router } from "express";
import { assetController } from "./asset.controller";

export const assetRoutes = Router();

assetRoutes.get("/", assetController.getAssets);
assetRoutes.get("/:id", assetController.getAssetById);
