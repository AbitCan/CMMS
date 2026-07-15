import { Router } from "express";
import { assetPartController } from "./assetPart.controller";

export const assetPartRoutes = Router();

assetPartRoutes.get("/", assetPartController.getAssetParts);
assetPartRoutes.get("/:id", assetPartController.getAssetPartById);
