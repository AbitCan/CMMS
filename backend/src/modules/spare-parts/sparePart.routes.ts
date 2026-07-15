import { Router } from "express";
import { sparePartController } from "./sparePart.controller";

export const sparePartRoutes = Router();

sparePartRoutes.get("/", sparePartController.getSpareParts);
sparePartRoutes.get("/:id", sparePartController.getSparePartById);
