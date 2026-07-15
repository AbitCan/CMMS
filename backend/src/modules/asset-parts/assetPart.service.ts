import { AppError } from "../../common/errors/AppError";
import { assetPartRepository } from "./assetPart.repository";
import type { AssetPartSummary } from "./assetPart.types";

type AssetPartRecord = Awaited<ReturnType<typeof assetPartRepository.findAll>>[number];

const toAssetPartSummary = (assetPart: AssetPartRecord): AssetPartSummary => ({
  id: assetPart.id,
  assetId: assetPart.assetId,
  partId: assetPart.partId,
  usageQuantity: assetPart.usageQuantity,
  componentLocation: assetPart.componentLocation,
  currentPartHours: assetPart.currentPartHours.toString(),
  installedAt: assetPart.installedAt,
  replacedAt: assetPart.replacedAt,
  createdAt: assetPart.createdAt,
  updatedAt: assetPart.updatedAt,
  asset: assetPart.asset,
  sparePart: {
    id: assetPart.part.id,
    partName: assetPart.part.partName,
    warehouseLocation: assetPart.part.warehouseLocation,
  },
});

export const assetPartService = {
  async getAssetParts(): Promise<AssetPartSummary[]> {
    const assetParts = await assetPartRepository.findAll();

    return assetParts.map(toAssetPartSummary);
  },

  async getAssetPartById(id: number): Promise<AssetPartSummary> {
    const assetPart = await assetPartRepository.findById(id);

    if (!assetPart) {
      throw new AppError("Asset part not found.", {
        statusCode: 404,
        errorCode: "ASSET_PART_NOT_FOUND",
        details: {
          id,
        },
      });
    }

    return toAssetPartSummary(assetPart);
  },
};
