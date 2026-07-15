export type SparePartSummary = {
  id: number;
  partName: string;
  stockQuantity: number;
  warehouseLocation: string;
  minStockLimit: number;
  assetPartsCount: number;
  createdAt: Date;
  updatedAt: Date;
};
