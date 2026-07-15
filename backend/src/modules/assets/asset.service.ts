import { AppError } from "../../common/errors/AppError";
import { assetRepository } from "./asset.repository";
import type { AssetSummary } from "./asset.types";

type AssetRecord = Awaited<ReturnType<typeof assetRepository.findAll>>[number];

const toAssetSummary = (asset: AssetRecord): AssetSummary => ({
  id: asset.id,
  name: asset.name,
  model: asset.model,
  location: asset.location,
  totalOperatingHours: asset.totalOperatingHours.toString(),
  status: asset.status,
  assetPartsCount: asset._count.assetParts,
  createdAt: asset.createdAt,
  updatedAt: asset.updatedAt,
});

export const assetService = {
  async getAssets(): Promise<AssetSummary[]> {
    const assets = await assetRepository.findAll();

    return assets.map(toAssetSummary);
  },

  async getAssetById(id: number): Promise<AssetSummary> {
    const asset = await assetRepository.findById(id);

    if (!asset) {
      throw new AppError("Asset not found.", {
        statusCode: 404,
        errorCode: "ASSET_NOT_FOUND",
        details: {
          id,
        },
      });
    }

    return toAssetSummary(asset);
  },
};
