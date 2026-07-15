import { prisma } from "../../config/prisma";
const assetPartWithRelationsSelect = {
  id: true,
  assetId: true,
  partId: true,
  usageQuantity: true,
  componentLocation: true,
  currentPartHours: true,
  installedAt: true,
  replacedAt: true,
  createdAt: true,
  updatedAt: true,
  asset: {
    select: {
      id: true,
      name: true,
      model: true,
      location: true,
    },
  },
  part: {
    select: {
      id: true,
      partName: true,
      warehouseLocation: true,
    },
  },
};

export const assetPartRepository = {
  findAll() {
    return prisma.assetPart.findMany({
      orderBy: {
        id: "asc",
      },
      select: assetPartWithRelationsSelect,
    });
  },

  findById(id: number) {
    return prisma.assetPart.findUnique({
      where: {
        id,
      },
      select: assetPartWithRelationsSelect,
    });
  },
};
