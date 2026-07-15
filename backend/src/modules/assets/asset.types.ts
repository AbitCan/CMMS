import type { AssetStatus } from "../../generated/prisma/client";
export type AssetSummary = {
  id: number;
  name: string;
  model: string;
  location: string;
  totalOperatingHours: string;
  status: AssetStatus;
  assetPartsCount: number;
  createdAt: Date;
  updatedAt: Date;
};
