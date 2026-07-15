export type AssetPartSummary = {
  id: number;
  assetId: number;
  partId: number;
  usageQuantity: number;
  componentLocation: string;
  currentPartHours: string;
  installedAt: Date;
  replacedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  asset: {
    id: number;
    name: string;
    model: string;
    location: string;
  };
  sparePart: {
    id: number;
    partName: string;
    warehouseLocation: string;
  };
};
