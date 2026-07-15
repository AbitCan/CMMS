import { AppError } from "../../common/errors/AppError";
import { sparePartRepository } from "./sparePart.repository";
import type { SparePartSummary } from "./sparePart.types";

type SparePartRecord = Awaited<ReturnType<typeof sparePartRepository.findAll>>[number];

const toSparePartSummary = (sparePart: SparePartRecord): SparePartSummary => ({
  id: sparePart.id,
  partName: sparePart.partName,
  stockQuantity: sparePart.stockQuantity,
  warehouseLocation: sparePart.warehouseLocation,
  minStockLimit: sparePart.minStockLimit,
  assetPartsCount: sparePart._count.assetParts,
  createdAt: sparePart.createdAt,
  updatedAt: sparePart.updatedAt,
});

export const sparePartService = {
  async getSpareParts(): Promise<SparePartSummary[]> {
    const spareParts = await sparePartRepository.findAll();

    return spareParts.map(toSparePartSummary);
  },

  async getSparePartById(id: number): Promise<SparePartSummary> {
    const sparePart = await sparePartRepository.findById(id);

    if (!sparePart) {
      throw new AppError("Spare part not found.", {
        statusCode: 404,
        errorCode: "SPARE_PART_NOT_FOUND",
        details: {
          id,
        },
      });
    }

    return toSparePartSummary(sparePart);
  },
};
